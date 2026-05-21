import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    if (password !== user.password) return res.status(401).json({ error: 'Invalid email or password' });

    const secret = process.env.JWT_SECRET || 'govtprep-secret';
    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '7d' });

    res.json({ data: { user, token } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
