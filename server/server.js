import express from 'express';
import path from 'path';
import cors from 'cors';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import courseRoutes from './routes/courses.js';
import testRoutes from './routes/tests.js';
import testResultRoutes from './routes/testResults.js';
import paymentRoutes from './routes/payments.js';
import practiceRoutes from './routes/practice.js';
import studyPlanRoutes from './routes/studyPlan.js';
import articleRoutes from './routes/articles.js';
import performanceRoutes from './routes/performance.js';
import dashboardRoutes from './routes/dashboard.js';
import settingRoutes from './routes/settings.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve('..')));

app.get('/', (req, res) => res.redirect('/login.html'));

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

const PORT = process.env.PORT || 5000;
await connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
