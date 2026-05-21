import express from 'express';
import User from '../models/User.js';
import TestResult from '../models/TestResult.js';
import Course from '../models/Course.js';
import Test from '../models/Test.js';

const router = express.Router();

router.get('/student/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('enrolledCourses');
    if (!user) return res.status(404).json({ error: 'User not found' });

    const testResults = await TestResult.find({ student: userId });
    const testsCompleted = testResults.length;
    const avgAccuracy = testsCompleted
      ? testResults.reduce((sum, r) => sum + (r.accuracy || 0), 0) / testsCompleted
      : 0;

    const courses = await Promise.all(
      (user.enrolledCourses || []).map(async (course) => {
        const progress = course.totalLessons
          ? Math.round((course.completedLessons / course.totalLessons) * 100)
          : 0;
        return {
          _id: course._id,
          title: course.title,
          emoji: course.emoji,
          category: course.category,
          progress,
        };
      })
    );

    const upcomingTests = await Test.find({ status: 'Live' }).limit(2);

    const recentResults = await TestResult.find({ student: userId })
      .sort({ date: -1 })
      .limit(4);

    res.json({
      data: {
        testsCompleted,
        avgAccuracy: Math.round(avgAccuracy * 100) / 100,
        streak: user.streak,
        allIndiaRank: user.allIndiaRank,
        courses,
        upcomingTests,
        recentResults,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
