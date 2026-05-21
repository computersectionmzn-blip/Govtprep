import express from 'express';
import User from '../models/User.js';
import TestResult from '../models/TestResult.js';
import SubjectPerformance from '../models/SubjectPerformance.js';

const router = express.Router();

router.get('/subject/:userId', async (req, res) => {
  try {
    const perf = await SubjectPerformance.find({ student: req.params.userId });
    res.json({ data: perf });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/trend/:userId', async (req, res) => {
  try {
    const results = await TestResult.find({ student: req.params.userId })
      .sort({ date: -1 })
      .limit(8);
    const scores = results.map((r) => ({
      score: r.score,
      total: r.total,
      accuracy: r.accuracy,
      date: r.date,
      testName: r.testName,
    })).reverse();
    res.json({ data: scores });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/student/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const testResults = await TestResult.find({ student: userId }).sort({ date: -1 });
    const testsDone = testResults.length;
    const avgAccuracy = testsDone
      ? testResults.reduce((sum, r) => sum + (r.accuracy || 0), 0) / testsDone
      : 0;

    const recentResults = testResults.slice(0, 8);
    const olderResults = testResults.slice(8, 16);
    const recentAvg = recentResults.length
      ? recentResults.reduce((s, r) => s + (r.accuracy || 0), 0) / recentResults.length
      : 0;
    const olderAvg = olderResults.length
      ? olderResults.reduce((s, r) => s + (r.accuracy || 0), 0) / olderResults.length
      : 0;
    const weekChange = olderAvg ? Math.round((recentAvg - olderAvg) * 100) / 100 : 0;

    res.json({
      data: {
        testsDone,
        avgAccuracy: Math.round(avgAccuracy * 100) / 100,
        allIndiaRank: user.allIndiaRank,
        bestScore: user.bestScore,
        weekChange,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
