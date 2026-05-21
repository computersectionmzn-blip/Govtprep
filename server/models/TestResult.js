import mongoose from 'mongoose';
const testResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  testName: String, score: Number, total: Number, accuracy: Number,
  rank: String, timeTaken: String, date: Date, status: String
}, { timestamps: true });
export default mongoose.model('TestResult', testResultSchema);
