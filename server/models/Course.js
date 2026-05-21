import mongoose from 'mongoose';
const courseSchema = new mongoose.Schema({
  title: String, emoji: String, description: String, category: String,
  totalLessons: Number, completedLessons: { type: Number, default: 0 },
  enrolledCount: { type: Number, default: 0 },
  status: { type: String, enum: ['Published', 'Draft'], default: 'Published' },
  progressColor: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
export default mongoose.model('Course', courseSchema);
