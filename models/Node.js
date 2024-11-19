//backend/models/Node.js
//Defines the Node model, which represents a node in the game.
const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  text: { type: String, required: true },  // Dialogue or description
  options: [
    {
      text: { type: String },
      nextNode: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' }, // Link to the next node
    }
  ],
});

module.exports = mongoose.model('Node', nodeSchema);
