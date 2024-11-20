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
  },
  level: {
    type: Number,
    default: 1
  },
  lives: { type: Number, default: 9 }

}, {
  collection: 'players'  // My MongoDB collection in Cluster0 ||database: visual_novel || collection: players
});

// Create a model for the player
const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
