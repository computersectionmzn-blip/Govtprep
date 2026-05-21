import express from 'express';
import Payment from '../models/Payment.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('student')
      .populate('course')
      .sort({ date: -1 });
    res.json({ data: payments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const [revenueResult] = await Payment.aggregate([
      { $match: { status: 'Success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const revenue = revenueResult ? revenueResult.total : 0;

    const total = await Payment.countDocuments();
    const pending = await Payment.countDocuments({ status: 'Pending' });
    const refunded = await Payment.countDocuments({ status: 'Refunded' });

    res.json({ data: { revenue, transactions: total, pending, refunded } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
