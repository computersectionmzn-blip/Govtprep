import mongoose from 'mongoose';
const practiceTopicSchema = new mongoose.Schema({
  title: String, emoji: String, description: String,
  totalQuestions: Number, completedPercentage: { type: Number, default: 0 },
  categoryId: Number, questions: [{
    q: String, a: String, opts: [String]
  }]
}, { timestamps: true });
export default mongoose.model('PracticeTopic', practiceTopicSchema);
