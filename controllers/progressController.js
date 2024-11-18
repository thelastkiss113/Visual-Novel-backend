//controllers/progressController.js
//Handles progress-related operations, such as saving player progress.

const Player = require('../models/Player');

// Update player progress (e.g., current node, lives remaining)
const updateProgress = async (req, res) => {
  try {
    const { playerId, nodeId, lives } = req.body;

    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    player.currentNode = nodeId;
    player.lives = lives;

    await player.save();
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateProgress };


