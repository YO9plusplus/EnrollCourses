const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const {
  register,
  login,
  getMe,
  logout,
  updateProfile,
  changePassword
} = require('../controllers/authController');

const rateLimit = require('express-rate-limit');

// Validation rules
const registerValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required')
];

const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const updateProfileValidation = [
    body('firstName').optional().notEmpty().withMessage('กรุณากรอกชื่อ'),
    body('lastName').optional().notEmpty().withMessage('กรุณากรอกนามสกุล'),
    body('title').optional().isIn(['นาย', 'นาง', 'นางสาว', 'อื่นๆ']),
    body('mobilePhone').optional(),
    body('age').optional().isInt({ min: 1, max: 120 }).withMessage('อายุไม่ถูกต้อง'),
    body('idCard').optional().isLength({ max: 13 }).withMessage('เลขบัตรประชาชนไม่ถูกต้อง'),
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
];


const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'พยายาม login มากเกินไป กรุณารอ 15 นาที'
  }
});

// Public routes

router.post('/register', authLimiter, registerValidation, register);
router.post('/login', authLimiter, loginValidation, login);

// Protected routes
router.get('/me', auth, getMe);
router.post('/logout', auth, logout);
router.put('/profile', auth, updateProfileValidation, updateProfile);
router.put('/change-password', auth, changePasswordValidation, changePassword);

module.exports = router;