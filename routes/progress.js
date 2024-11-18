//routes/progress.js
//Handles progress-related routes, such as saving player progress.
const express = require('express');
const { updateProgress } = require('../controllers/progressController');
const router = express.Router();

router.post('/', updateProgress);  // Update player progress

module.exports = router;
