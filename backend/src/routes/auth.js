const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Basic login endpoint (placeholder password check)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });

  try {
    const result = await db.query('SELECT student_id, email, password_hash FROM students WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = result.rows[0];
    // In a real app compare hashed passwords. Here we accept the placeholder.
    if (password !== 'password' && user.password_hash !== 'hashed_password_placeholder') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Logged in', user: { student_id: user.student_id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
