const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config();

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'development' ? 1000 : 100,
  message: {
    success: false,
    message: 'Too many requests, please try again later'
  }
})

const authRoutes = require('./routes/auth');
const registrationRoutes = require('./routes/registration');
const courseRoutes = require('./routes/course');

const app = express();

app.use(globalLimiter);
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://enrollcourses.onrender.com'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded( { extended: true }));

const connectDB = require('./config/db');
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/courses', courseRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;