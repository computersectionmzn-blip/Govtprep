import mongoose from 'mongoose';
const testSchema = new mongoose.Schema({
  title: String, category: String, questions: Number, duration: Number,
  status: { type: String, enum: ['Live', 'Draft'], default: 'Live' },
  description: String, attempts: { type: Number, default: 0 },
  avgScore: { type: Number, default: 0 }, passRate: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model('Test', testSchema);
