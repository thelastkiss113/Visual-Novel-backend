//backend/routes/progress.js
//Handles progress-related routes, such as saving player progress.

const express = require('express'); // Framework for creating API routes
const router = express.Router(); // Create a new router instance
const Progress = require('../models/Progress'); // Mongoose model for progress data

/**
 * @route   POST /api/progress
 * @desc    Create a new progress record in the database
 * @access  Public (No authentication is implemented here)
 */
router.post('/', async (req, res) => {
  try {
    // Create a new progress document using the request body
    const newProgress = new Progress(req.body);

    // Save the new progress document to the database
    await newProgress.save();

    // Send the saved document back as a response with status 201 (Created)
    res.status(201).json(newProgress);
  } catch (err) {
    // If an error occurs, send a 400 (Bad Request) response with the error message
    res.status(400).json({ message: err.message });
  }
});

/**
 * @route   GET /api/progress
 * @desc    Retrieve all progress records from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch all progress documents from the database
    const progress = await Progress.find();

    // Send the retrieved progress documents as a JSON response
    res.json(progress);
  } catch (err) {
    // If an error occurs, send a 500 (Internal Server Error) response with the error message
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   GET /api/progress/:id
 * @desc    Retrieve a specific progress record by its ID
 * @param   {String} id - The ID of the progress record to retrieve
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    // Find the progress document by its ID
    const progress = await Progress.findById(req.params.id);

    // If the document is not found, send a 404 (Not Found) response
    if (!progress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }

    // Send the found progress document as a JSON response
    res.json(progress);
  } catch (err) {
    // If an error occurs, send a 500 (Internal Server Error) response with the error message
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   PATCH /api/progress/:id
 * @desc    Update a specific progress record by its ID
 * @param   {String} id - The ID of the progress record to update
 * @access  Public
 */
router.patch('/:id', async (req, res) => {
  try {
    // Find the progress document by its ID and update it with the new data from the request body
    const updatedProgress = await Progress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document instead of the original
    );

    // If the document is not found, send a 404 (Not Found) response
    if (!updatedProgress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }

    // Send the updated progress document as a JSON response
    res.json(updatedProgress);
  } catch (err) {
    // If an error occurs, send a 400 (Bad Request) response with the error message
    res.status(400).json({ message: err.message });
  }
});

/**
 * @route   DELETE /api/progress/:id
 * @desc    Delete a specific progress record by its ID
 * @param   {String} id - The ID of the progress record to delete
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
  try {
    // Find the progress document by its ID and delete it
    const deletedProgress = await Progress.findByIdAndDelete(req.params.id);

    // If the document is not found, send a 404 (Not Found) response
    if (!deletedProgress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }

    // Send a success message as a response
    res.json({ message: 'Progress record deleted successfully' });
  } catch (err) {
    // If an error occurs, send a 500 (Internal Server Error) response with the error message
    res.status(500).json({ message: err.message });
  }
});

// Export the router so it can be used in other parts of the ap
module.exports = router;