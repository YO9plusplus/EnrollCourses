const express = require('express');
const router = express.Router();
const { sentFeedback } = require("../controllers/feedbackController");

router.post('/', sentFeedback);

module.exports = router;