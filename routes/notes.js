const express = require('express');
const router = express.Router();
const Note = require('../models/note');

// Get all notes
router.get('/', async (req, res) => {
  
});

// Get a note by ID
router.get('/:id', async (req, res) => {
  
});

// Create a new note
router.post('/', async (req, res) => {
  
});

// Update a note by ID
router.put('/:id', async (req, res) => {
  
});

// Delete a note by ID
router.delete('/:id', async (req, res) => {

});

// Share a note with another user
router.post('/:id/share', async (req, res) => {

});

// Search for notes based on keywords
router.get('/search', async (req, res) => {

});

module.exports = router;
