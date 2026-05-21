import express from 'express';
import Test from '../models/Test.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 });
    res.json({ data: tests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ error: 'Test not found' });
    res.json({ data: test });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const test = await Test.create(req.body);
    res.status(201).json({ data: test });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
