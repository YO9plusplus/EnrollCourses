const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { 
            email, 
            password, 
            firstName, 
            lastName,
            // Personal Info
            title,
            religion,
            birthDate,
            age,
            idCard,
            // Contact Info
            mobilePhone,
            lineId,
            // Education Info
            education,
            major,
            majorOther,
            // Work Info
            position,
            academicLevel,
            school,
            district,
            officePhone,
            schoolPhone,
            // Health Info
            healthCondition,
            foodRestrictions
        } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        user = new User({
            // Auth
            email,
            password,
            // Personal Info
            firstName,
            lastName,
            title,
            religion,
            birthDate,
            age,
            idCard,
            // Contact Info
            mobilePhone,
            lineId,
            // Education Info
            education,
            major,
            majorOther,
            // Work Info
            position,
            academicLevel,
            school,
            district,
            officePhone,
            schoolPhone,
            // Health Info
            healthCondition,
            foodRestrictions
        });

        await user.save();

        const payload = {
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                title: user.title,
                religion: user.religion,
                birthDate: user.birthDate,
                age: user.age,
                idCard: user.idCard,
                mobilePhone: user.mobilePhone,
                lineId: user.lineId,
                education: user.education,
                major: user.major,
                majorOther: user.majorOther,
                position: user.position,
                academicLevel: user.academicLevel,
                school: user.school,
                district: user.district,
                officePhone: user.officePhone,
                schoolPhone: user.schoolPhone,
                healthCondition: user.healthCondition,
                foodRestrictions: user.foodRestrictions,
                role: user.role
            }
        });
    } catch(err) {
        console.error('Register error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Server error during registration' 
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array
            });
        }

        const { email, password } = req.body;

        const user = await User.findOne( { email } );
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const payload = {
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
        });
    } catch(err) {
        console.error('Login error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user
        });
    } catch(err) {
        console.error('Get user error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Logout user (optional - for token blacklist)
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  try {
    // If you implement token blacklist, add logic here
    // For now, just send success response
    // Client should remove token from localStorage
    
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                errors: errors.array() 
            });
        }

        const { firstName, lastName } = req.body;

        const updateFields = {};
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;

        const user = await User.findByIdAndUpdate(
            req.user.user.id,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user
        });
    } catch(err) {
        console.error('Update profile error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error' 
        });
    }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};