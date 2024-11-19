//backend/controllers/playerController.js
//Handles player-related operations, such as creating a new player or updating their progress.
const Player = require('../models/Player');

// C:(Create) Create a new player
const createPlayer = async (req, res) => {
  try {
    const player = new Player({
      name: req.body.name,
    });
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get player data by ID
const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate('currentNode');
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPlayer, getPlayerById };

