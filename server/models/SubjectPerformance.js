import mongoose from 'mongoose';
const subjectPerformanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: String, accuracy: Number, color: String
}, { timestamps: true });
export default mongoose.model('SubjectPerformance', subjectPerformanceSchema);
