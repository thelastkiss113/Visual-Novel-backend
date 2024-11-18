//models/Player.js
//Defines the Player model, which represents a player in the game.
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lives: { type: Number, default: 9 },
  currentNode: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' }, // references the Node model
});

module.exports = mongoose.model('Player', playerSchema);
