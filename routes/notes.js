const express = require('express');
const Joi = require('joi');
const notes = express.Router();
const Note = require('../models/notes');

// Joi schema for note validation
const noteSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
});

const noteUpdateSchema = Joi.object({
    title: Joi.string(),
    content: Joi.string(),
}).or('title', 'content');

// Joi schema for ID validation
const idSchema = Joi.object({
    id: Joi.string().alphanum().length(24).required(),
});

// Get all notes
notes.get('/fetch', async (req, res) => {
    // No validation needed for this route
    try {
        const notes = await Note.find({ userId: req.user.id });
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get a note by ID
notes.get('/fetch/:id', async (req, res) => {
    try {
        const { error } = idSchema.validate({ id: req.params.id });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Create a new note
notes.post('/', async (req, res) => {
    try {
        console.log("BODY",req.body);
        const { error } = noteSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { title, content } = req.body;
        const note = await Note.create({ title, content, userId: req.user.id });

        res.status(201).json({ message: 'Note created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update a note by ID
notes.put('/:id', async (req, res) => {
    try {
        const { error: idError } = idSchema.validate({ id: req.params.id });
        const { error: noteError } = noteUpdateSchema.validate(req.body);

        if (idError) {
            return res.status(400).json({ message: idError.details[0].message });
        }

        if (noteError) {
            return res.status(400).json({ message: noteError.details[0].message });
        }

        const { title, content } = req.body;
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { ...req.body },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(updatedNote);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a note by ID
notes.delete('/:id', async (req, res) => {
    try {
        const { error } = idSchema.validate({ id: req.params.id });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json({ message: 'Note deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Share a note with another user
notes.post('/:id/share', async (req, res) => {
    const note = await Note.findOne({ _id: req.params.id});
    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(note);
});

// Search for notes based on keywords
// Search for notes based on keywords
notes.get('/search', async (req, res) => {
    try {
        console.log("SEARCH",req?.query?.searchString);
        const { error } = Joi.string().min(1).validate(req?.query?.searchString);

        if (error) {
            return res.status(400).json({ message: 'Invalid search query' });
        }

        const query = req.query.searchString;
        const searchResults = await Note.find({ $text: { $search: query }, userId: req.user.id });
        res.json(searchResults);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = notes;
