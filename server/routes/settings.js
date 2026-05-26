import express from 'express';
import Setting from '../models/Setting.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    res.json({ data: settings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }
    res.json({ data: settings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) return res.status(404).json({ error: 'Admin user not found' });
    if (admin.password !== currentPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    admin.password = newPassword;
    await admin.save();
    res.json({ data: { message: 'Password updated successfully' } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
