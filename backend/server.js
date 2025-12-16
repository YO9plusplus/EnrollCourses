const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const registrationRoutes = require('./routes/registration');

const app = express();

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