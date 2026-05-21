import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: String, email: { type: String, unique: true }, password: String,
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  gender: { type: String, enum: ['male', 'female'], default: 'male' },
  avatar: String, targetExam: String, status: { type: String, enum: ['Active', 'Pending', 'Inactive'], default: 'Active' },
  joined: { type: Date, default: Date.now },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  streak: { type: Number, default: 0 },
  allIndiaRank: { type: Number, default: 0 },
  bestScore: { type: Number, default: 0 },
  studyHours: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model('User', userSchema);
