const express = require('express');
const router = express.Router();
// const OpenAI = require('openai');

// Initialize bloom AI OpenAI
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// System prompt
const SYSTEM_PROMPT = `
You are bloom AI Stylist, a luxury floral bouquet assistant.

Your job:
- Recommend bouquets
- Suggest flower combinations
- Help users choose bouquets for occasions
- Match aesthetics, moods, and colors

Bouquet Types:
- Rose Bouquet
- Tulip Arrangement
- Sunflower Bouquet
- Orchid Collection
- Peony Basket
- Lavender Floral Set
- Lily Arrangement

Rules:
- Be elegant and friendly
- Keep answers short and warm
- Recommend flowers creatively
- Use floral emojis occasionally 🌸
`;

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'API key not configured'
      });
    }

    // 🔥 OpenAI call
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4.1-mini",
    //   messages: [
    //     { role: "system", content: SYSTEM_PROMPT },
    //     { role: "user", content: message }
    //   ],
    //   temperature: 0.7,
    //   max_tokens: 150
    // });

    const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: message }
  ],
  max_tokens: 150,
  temperature: 0.7
  });

    const reply = response.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.error("❌ Bloom AI Error:", error);
    console.log("error");
    res.status(500).json({
      error: "Bloom AI request failed",
      details: error.message
    });
  }
});

module.exports = router;