const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Registration Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phone, faculty, department, dob } = req.body;

  try {
    // In a real app, we would hash the password here
    const query = `
      INSERT INTO students (first_name, last_name, email, password_hash, phone_number, faculty, department, date_of_birth)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING student_id, email;
    `;
    
    // Mocking password_hash for now
    const values = [firstName, lastName, email, 'hashed_password_placeholder', phone, faculty, department, dob];
    
    const result = await db.query(query, values);
    
    res.status(201).json({
      message: 'Student registered successfully',
      student: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    if (err.code === '23505') { // Unique violation
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
