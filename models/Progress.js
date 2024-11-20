//backend/models/Progress.js
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  currentNode: { type: String, required: true },
  visitedRooms: [String],
  livesUsed: { type: Number, default: 0 },
  isGameOver: { type: Boolean, default: false },
});

module.exports = mongoose.model('Progress', progressSchema);
