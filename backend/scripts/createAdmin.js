require('dotenv').config();
const User = require('../models/User');
const connectDB = require('../config/db');

const admins = [
  { email: 'scout@admin.com',      firstName: 'Scout',      lastName: 'Admin' },
  { email: 'rcy@admin.com',        firstName: 'RCY',        lastName: 'Admin' },
  { email: 'plan@admin.com',       firstName: 'Plan',       lastName: 'Admin' },
  { email: 'teach@admin.com',      firstName: 'Teach',      lastName: 'Admin' },
  { email: 'director1@admin.com',  firstName: 'Director1',  lastName: 'Admin' },
  { email: 'director2@admin.com',  firstName: 'Director2',  lastName: 'Admin' },
  { email: 'director3@admin.com',  firstName: 'Director3',  lastName: 'Admin' },
];

const DEFAULT_PASSWORD = 'ChangeMe123'; // แนะนำให้แต่ละคน login แล้วเปลี่ยนทันที

const createAdmins = async () => {
  try {
    await connectDB();

    for (const { email, firstName, lastName } of admins) {
      const existing = await User.findOne({ email });
      if (existing) {
        console.log(`⏭️  Skipped (already exists): ${email}`);
        continue;
      }

      await User.create({
        email,
        password: DEFAULT_PASSWORD,
        firstName,
        lastName,
        title: 'นาย',
        role: 'admin',
      });

      console.log(`✅ Created: ${email}`);
    }

    console.log(`\nDefault password for all: ${DEFAULT_PASSWORD}`);
    console.log('⚠️  ให้แต่ละคน login แล้วเปลี่ยน password เองผ่าน PUT /api/auth/change-password');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admins:', error);
    process.exit(1);
  }
};

createAdmins();