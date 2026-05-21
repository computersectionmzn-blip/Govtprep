import express from 'express';
import StudyPlan from '../models/StudyPlan.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const plans = await StudyPlan.find().sort({ date: 1 });
    res.json({ data: plans });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/toggle', async (req, res) => {
  try {
    const plan = await StudyPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ error: 'Study plan entry not found' });
    plan.completed = !plan.completed;
    await plan.save();
    res.json({ data: plan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
