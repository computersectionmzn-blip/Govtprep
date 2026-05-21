import express from 'express';
import TestResult from '../models/TestResult.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const results = await TestResult.find().sort({ date: -1 });
    res.json({ data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/student/:userId', async (req, res) => {
  try {
    const results = await TestResult.find({ student: req.params.userId }).sort({ date: -1 });
    res.json({ data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await TestResult.create(req.body);
    res.status(201).json({ data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
