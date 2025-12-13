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
  body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().notEmpty().withMessage('Last name cannot be empty')
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
];

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Protected routes
router.get('/me', auth, getMe);
router.post('/logout', auth, logout);
router.put('/profile', auth, updateProfileValidation, updateProfile);
router.put('/change-password', auth, changePasswordValidation, changePassword);

module.exports = router;