const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const auth = require('../middleware/auth');
const { uploadCourseImage } = require('../middleware/cloudinaryUpload');
const {
	createCourse,
	getAllCourses,
	getCourse,
	updateCourse,
	deleteCourse,
} = require('../controllers/courseController');

// Public
router.get('/', getAllCourses);
router.get('/:id', auth, getCourse);

// Admin only
router.post('/admin/', auth, adminAuth, uploadCourseImage.single('image'), createCourse);
router.put('/admin/:id', auth, adminAuth, uploadCourseImage.single('image'), updateCourse);
router.delete('/admin/:id', auth, adminAuth, deleteCourse);

module.exports = router;