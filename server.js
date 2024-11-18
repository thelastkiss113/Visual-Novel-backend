// server.js
// Entry point for the backend server, setting up the Express server and routes

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const playerRoutes = require('./routes/players');  // Routes for player data
const progressRoutes = require('./routes/progress');  // Routes for game progress

// Load environment variables
dotenv.config();

// Connect to MongoDB using the MONGO_URI in .env file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

const app = express();

// Middleware setup
app.use(cors());  // Enable CORS for all incoming requests
app.use(express.json());  // Parse incoming JSON requests

// Routes
app.use('/api/players', playerRoutes);  // API route for player data
app.use('/api/progress', progressRoutes);  // API route for progress data

// Start the server
const PORT = process.env.PORT || 5000;  // Default port is 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
