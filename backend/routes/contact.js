const express = require('express');
const router = express.Router();
// Correct import path (add ../ to go up one level)
const contactController = require('../controllers/contactController');

router.post('/', contactController.submitContactForm);

module.exports = router;