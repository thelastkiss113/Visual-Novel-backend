// backend/server.js
// Entry point for the backend server, setting up the Express server and routes

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const playerRoutes = require('./routes/players');
const progressRoutes = require('./routes/progress');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/players', playerRoutes);
app.use('/api/progress', progressRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
