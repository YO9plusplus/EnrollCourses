const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Auth fields
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  // Personal Info (from PersonalInfoFields)
  title: {
    type: String,
    enum: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ']
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  religion: String,
  birthDate: Date,
  age: Number,
  idCard: {
    type: String,
    maxlength: 13
  },

  // Contact Info (from ContactFields)
  mobilePhone: String,
  lineId: String,

  // Education Info (from EducationFields)
  education: String,
  major: String,

  // Work Info (from WorkInfoFields)
  position: String,
  academicLevel: String,
  school: String,
  district: String,
  officePhone: String,
  schoolPhone: String,

  // Health Info (from HealthFields)
  healthCondition: String,
  foodRestrictions: String,

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password and update timestamp before saving
userSchema.pre('save', async function() {
  // Update timestamp
  this.updatedAt = Date.now();
  
  // Hash password only if modified
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);