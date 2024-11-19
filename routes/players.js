// backend/routes/players.js
// Handles player-related routes, such as creating a new player or fetching all players.

const express = require('express');
const Player = require('../models/Player');  // Import the Player model

const router = express.Router();

// POST route to create a new player
router.post('/', async (req, res) => {
  try {
    const { name, email, level } = req.body;
    const newPlayer = new Player({ name, email, level });

    await newPlayer.save();
    res.status(201).json(newPlayer);  // Return the newly created player
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating player' });
  }
});

// GET route to fetch all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();  // Fetch all players from the database
    res.status(200).json(players);  // Return the players array
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching players' });
  }
});

// GET route to fetch a single player by ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);  // Find the player by ID
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.status(200).json(player);  // Return the player data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching player' });
  }
});

// PUT route to update a player by ID
router.put('/:id', async (req, res) => {
    try {
      const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPlayer) {
        return res.status(404).json({ message: 'Player not found' });
      }
      res.json(updatedPlayer);  // Return the updated player data
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// DELETE route to delete a player by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);  // Delete the player
    if (!deletedPlayer) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.status(200).json({ message: 'Player deleted successfully' });  // Confirm the deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting player' });
  }
});

module.exports = router;
