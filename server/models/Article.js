import mongoose from 'mongoose';
const articleSchema = new mongoose.Schema({
  title: String, summary: String, category: String,
  date: String, icon: String, link: String, isLive: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model('Article', articleSchema);
