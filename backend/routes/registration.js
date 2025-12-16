const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const registrationController = require('../controllers/registrationController');

// User routes (authenticated)
router.post('/', auth, registrationController.createRegistration);
router.get('/my-registration', auth, registrationController.getMyRegistrations);
router.get('/:id', auth, registrationController.getRegistrationById);

// Admin routes (admin only)
router.get('/admin/all', auth, adminAuth, registrationController.getAllRegistrations);
router.get('/admin/course/:courseId', auth, adminAuth, registrationController.getRegistrationsByCourse);
router.get('/admin/status/:status', auth, adminAuth, registrationController.getRegistrationsByStatus);
router.put('/admin/:id/status', auth, adminAuth, registrationController.updateRegistrationStatus);
router.put('/admin/:id/notes', auth, adminAuth, registrationController.updateAdminNotes);
router.get('/admin/export/:courseId', auth, adminAuth, registrationController.exportToExcel);

module.exports = router;