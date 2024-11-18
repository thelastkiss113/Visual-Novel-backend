//routes/players.js
//Handles player-related routes, such as creating a new player or getting player data by ID.
const express = require('express');
const { createPlayer, getPlayerById } = require('../controllers/playerController');
const router = express.Router();

router.post('/', createPlayer);  // Create new player
router.get('/:id', getPlayerById);  // Get player data by ID

module.exports = router;
