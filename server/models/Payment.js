import mongoose from 'mongoose';
const paymentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studentName: String, course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  courseName: String, amount: Number, date: Date,
  method: { type: String, enum: ['UPI', 'Card', 'NetBanking'] },
  status: { type: String, enum: ['Success', 'Pending', 'Refunded'] },
  txnId: String
}, { timestamps: true });
export default mongoose.model('Payment', paymentSchema);
