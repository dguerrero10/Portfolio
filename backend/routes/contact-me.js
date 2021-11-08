const express = require('express');
const router = express.Router();

const feedbackController = require('../controllers/contact-me');

router.post('/submit-feedback', feedbackController.submitFeedback)
router.post('/submit-message', feedbackController.submitMessage)

module.exports = router;