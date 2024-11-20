// backend/routes/players.js
// Handles player-related routes

const express = require('express');
const router = express.Router();
const Player = require('../models/Player'); // Import the Player model

// POST route to create a new player
router.post('/', async (req, res) => {
  try {
    const { name, email, level, lives } = req.body;

    // Create and save a new player
    const newPlayer = new Player({ name, email, level, lives });
    await newPlayer.save();

    res.status(201).json(newPlayer); // Respond with the newly created player
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating player' });
  }
});

// GET route to fetch all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find(); // Fetch all players from the database
    res.status(200).json(players); // Return the players array
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching players' });
  }
});

// GET route to fetch a single player by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id; // Extract the ID from the request parameters

    // Find the player by ID
    const player = await Player.findById(id); 
    console.log("Fetched player:", player); // Add a console log for debugging

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.status(200).json(player); // Return the player data
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
