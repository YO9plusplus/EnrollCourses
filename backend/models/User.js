const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY.padEnd(32).slice(0, 32));

const encrypt = (text) => {
  if (!text) return text;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return iv.toString('hex')+ ":" + encrypted.toString('hex');
}

const decrypt = (text) => {
  if (!text) return text;
  const [ivHex, encryptedHex] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString();
}

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
  
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  if (this.isModified('idCard') && this.idCard) {
    this.idCard = encrypt(this.idCard);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getIdCard = function() {
  return decrypt(this.idCard);
}

module.exports = mongoose.model('User', userSchema);