const express = require('express');
const cors = require('cors');
require('dotenv').config();

const chatRoutes = require('./routes/chat');
const voiceOrderRoutes = require('./routes/voiceOrder');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/order/voice', voiceOrderRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Bloom Bouquet Shop API is running!' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
