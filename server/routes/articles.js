import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json({ data: articles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
