//backend/models/Progress.js
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  visitedRooms: [String],
  interactions: [{ type: String }],
  livesUsed: { type: Number, default: 0 },
  isGameOver: { type: Boolean, default: false },
});

module.exports = mongoose.model('Progress', progressSchema);
