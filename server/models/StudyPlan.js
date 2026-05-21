import mongoose from 'mongoose';
const studyPlanSchema = new mongoose.Schema({
  day: String, date: Number, title: String, tasks: String,
  completed: { type: Boolean, default: false },
  week: { type: Number, default: 3 },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
export default mongoose.model('StudyPlan', studyPlanSchema);
