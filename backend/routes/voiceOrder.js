// filepath: backend/routes/voiceOrder.js

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// ======================================================
// Initialize SQLite Database
// ======================================================

const db = new sqlite3.Database('./bloom.db', (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
  } else {
    console.log('🌸 Connected to Bloom database');

    db.run(`
      CREATE TABLE IF NOT EXISTS voice_orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        order_text TEXT NOT NULL,
        parsed_item TEXT,
        quantity INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

// ======================================================
// Bouquet Catalog
// ======================================================

const BOUQUETS = {
  rose: {
    name: 'Rose Whisper Bouquet',
    price: 1499,
    category: 'Romantic Collection'
  },

  tulip: {
    name: 'Tulip Garden Bloom',
    price: 1399,
    category: 'Fresh Collection'
  },

  sunflower: {
    name: 'Sunlight Meadow Bouquet',
    price: 1599,
    category: 'Fresh Collection'
  },

  orchid: {
    name: 'Royal Orchid Essence',
    price: 2999,
    category: 'Luxury Collection'
  },

  peony: {
    name: 'Peony Grace Arrangement',
    price: 1899,
    category: 'Elegant Collection'
  },

  lavender: {
    name: 'Lavender Serenity Bouquet',
    price: 1699,
    category: 'Elegant Collection'
  },

  lily: {
    name: 'White Lily Grace',
    price: 1799,
    category: 'Elegant Collection'
  },

  wildflower: {
    name: 'Wildflower Meadow Mix',
    price: 1499,
    category: 'Natural Collection'
  }
};

// ======================================================
// Parse Voice Order
// ======================================================

function parseOrderText(text) {

  const lowerText = text.toLowerCase();

  const items = [];

  // ======================================================
  // Quantity Detection
  // ======================================================

  let quantity = 1;

  const quantityMatch = lowerText.match(
    /(\d+)\s*(bouquet|bouquets|flowers|arrangement|order)?/
  );

  if (quantityMatch) {
    quantity = parseInt(quantityMatch[1]);
  }

  // ======================================================
  // Bouquet Detection
  // ======================================================

  for (const [key, bouquet] of Object.entries(BOUQUETS)) {

    if (lowerText.includes(key)) {

      items.push({
        ...bouquet,
        quantity: quantity
      });

    }
  }

  return items;
}

// ======================================================
// POST Voice Order
// ======================================================

router.post('/', (req, res) => {

  try {

    const { orderText, userId } = req.body;

    if (!orderText) {

      return res.status(400).json({
        error: 'Order text is required'
      });

    }

    // ======================================================
    // Parse Order
    // ======================================================

    const parsedItems = parseOrderText(orderText);

    if (parsedItems.length === 0) {

      return res.json({
        success: false,
        message:
          "🌸 Sorry, I couldn't recognize any bouquet styles. Try saying something like '2 rose bouquets' or '1 orchid arrangement'.",
        parsedItems: [],
        orderText
      });

    }

    // ======================================================
    // Store Orders in Database
    // ======================================================

    const stmt = db.prepare(`
      INSERT INTO voice_orders
      (user_id, order_text, parsed_item, quantity)
      VALUES (?, ?, ?, ?)
    `);

    parsedItems.forEach(item => {

      stmt.run(
        userId || null,
        orderText,
        JSON.stringify(item),
        item.quantity
      );

    });

    stmt.finalize();

    // ======================================================
    // Calculate Total
    // ======================================================

    const total = parsedItems.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    // ======================================================
    // Success Response
    // ======================================================

    res.json({
      success: true,
      message: '🌷 Voice order processed successfully!',
      parsedItems,
      total: total.toFixed(2),
      currency: 'INR',
      orderText
    });

  } catch (error) {

    console.error('❌ Voice order error:', error);

    res.status(500).json({
      error: 'Failed to process voice order'
    });

  }

});

// ======================================================
// GET All Voice Orders
// ======================================================

router.get('/', (req, res) => {

  db.all(
    'SELECT * FROM voice_orders ORDER BY created_at DESC',
    [],
    (err, rows) => {

      if (err) {

        return res.status(500).json({
          error: err.message
        });

      }

      res.json(rows);

    }
  );

});

// ======================================================
// Export Router
// ======================================================

module.exports = router;