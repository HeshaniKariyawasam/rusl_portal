const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const registrationRouter = require('./routes/registration');
const authRouter = require('./routes/auth');
const db = require('./config/db');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'UP', service: 'RUSL Portal API' });
});

// Mount API routes under /api
app.use('/api', registrationRouter);
app.use('/api/auth', authRouter);

// simple DB connectivity check endpoint
app.get('/api/db-check', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.json({ ok: true });
    } catch (err) {
        console.error('DB check failed', err);
        res.status(500).json({ ok: false, error: 'DB connection failed' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});