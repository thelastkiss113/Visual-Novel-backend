//backend/controllers/progressController.js
//Handles progress-related operations, such as saving player progress.

const Progress = require('../models/Progress');

// Save game progress
exports.saveProgress = async (req, res) => {
  try {
    const { playerId, gameData } = req.body;
    let progress = await Progress.findOne({ playerId });

    if (progress) {
      progress.gameData = gameData; // Update existing progress
    } else {
      progress = new Progress({ playerId, gameData }); // Create new progress
    }

    await progress.save();
    res.status(201).json({ message: 'Game progress saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Load game progress
exports.loadProgress = async (req, res) => {
  try {
    const { playerId } = req.params;
    const progress = await Progress.findOne({ playerId });

    if (!progress) {
      return res.status(404).json({ message: 'No progress found for this player.' });
    }

    res.json(progress.gameData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
