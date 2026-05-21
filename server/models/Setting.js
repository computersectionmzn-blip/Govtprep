import mongoose from 'mongoose';
const settingSchema = new mongoose.Schema({
  platformName: { type: String, default: 'GovtPrep' },
  supportEmail: { type: String, default: 'support@govtprep.in' },
  contactNumber: { type: String, default: '+91 98765 43210' },
  websiteUrl: { type: String, default: 'https://govtprep.in' },
  notifications: {
    newRegistration: { type: Boolean, default: true },
    paymentAlerts: { type: Boolean, default: true },
    testReports: { type: Boolean, default: false },
    refundRequests: { type: Boolean, default: true }
  },
  features: {
    studentRegistrations: { type: Boolean, default: true },
    freeMockTests: { type: Boolean, default: true },
    googleLogin: { type: Boolean, default: false },
    maintenanceMode: { type: Boolean, default: false }
  }
}, { timestamps: true });
export default mongoose.model('Setting', settingSchema);
