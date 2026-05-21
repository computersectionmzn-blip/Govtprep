import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from '../server/routes/auth.js';
import userRoutes from '../server/routes/users.js';
import courseRoutes from '../server/routes/courses.js';
import testRoutes from '../server/routes/tests.js';
import testResultRoutes from '../server/routes/testResults.js';
import paymentRoutes from '../server/routes/payments.js';
import practiceRoutes from '../server/routes/practice.js';
import studyPlanRoutes from '../server/routes/studyPlan.js';
import articleRoutes from '../server/routes/articles.js';
import performanceRoutes from '../server/routes/performance.js';
import dashboardRoutes from '../server/routes/dashboard.js';
import settingRoutes from '../server/routes/settings.js';

const app = express();
app.use(cors());
app.use(express.json());

let cachedDb = null;
async function connectDB() {
  if (cachedDb) return cachedDb;
  await mongoose.connect(process.env.MONGO_URI);
  cachedDb = mongoose.connection;
  console.log('MongoDB connected');
  return cachedDb;
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/test-results', testResultRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/practice', practiceRoutes);
app.use('/api/study-plan', studyPlanRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/settings', settingRoutes);

export const api = functions.https.onRequest(app);
