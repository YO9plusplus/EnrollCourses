const express = require('express');
const router = express.Router();
const controller = require("../controllers/feedbackController");
const { upload } = require('../middleware/cloudinaryUpload');
const auth = require('../middleware/auth');

router.post('/', upload.single('image'), controller.createFeedback);

router.get('/admin/all', auth, controller.getAllThreads);
router.post('/admin/:id/messages', auth, upload.single('image'), controller.addAdminMessage);

router.get('/:token', controller.getThreadByToken);
router.post('/:token/messages', upload.single('image'), controller.addUserMessage);

module.exports = router;