//backend/models/Player.js
//Defines the Player model, which represents a player in the game.
const mongoose = require('mongoose');

// Define the player schema
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: Number,
    default: 1
  }
}, {
  collection: 'visual_novel'  // My MongoDB collection in Cluster0 || database: visual_novel/game-data
});

// Create a model for the player
const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
