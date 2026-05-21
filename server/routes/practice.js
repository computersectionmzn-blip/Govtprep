import express from 'express';
import PracticeTopic from '../models/PracticeTopic.js';

const router = express.Router();

router.get('/topics', async (req, res) => {
  try {
    const topics = await PracticeTopic.find().sort({ createdAt: -1 });
    res.json({ data: topics });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/topics/:id', async (req, res) => {
  try {
    const topic = await PracticeTopic.findById(req.params.id);
    if (!topic) return res.status(404).json({ error: 'Topic not found' });
    res.json({ data: topic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
