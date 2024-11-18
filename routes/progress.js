//routes/progress.js
//Handles progress-related routes, such as saving player progress.
// routes/progress.js
const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress'); // Model for progress data

// Create a new progress record
router.post('/', async (req, res) => {
  try {
    const newProgress = new Progress(req.body);
    await newProgress.save();
    res.status(201).json(newProgress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all progress records
router.get('/', async (req, res) => {
  try {
    const progress = await Progress.find();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single progress record by ID
router.get('/:id', async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a progress record by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProgress = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProgress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    res.json(updatedProgress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a progress record by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProgress = await Progress.findByIdAndDelete(req.params.id);
    if (!deletedProgress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }
    res.json({ message: 'Progress record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
