require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const createAdmin = async () => {
  try {
    // Connect to database
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@admin.com' });
    
    if (existingAdmin) {
      console.log('❌ Admin user already exists');
      process.exit(1);
    }

    // Create admin user
    const admin = await User.create({
      email: 'admin@admin.com',
      password: 'admin123',  // Change this to a secure password
      firstName: 'Admin',
      lastName: 'System',
      title: 'นาย',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully');
    console.log('Email:', admin.email);
    console.log('Password: admin123');
    console.log('⚠️  Please change the password after first login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();