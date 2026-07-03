const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const controller = require('../controllers/academicLevelController');
const { upload } = require('../middleware/cloudinaryUpload');

router.post('/', auth, upload.single('evidenceImage'), controller.createRequest);
router.get('/admin/all', auth, adminAuth, controller.getAllRequests);
router.put('/admin/:id/status', auth, adminAuth, controller.reviewRequest);

module.exports = router;