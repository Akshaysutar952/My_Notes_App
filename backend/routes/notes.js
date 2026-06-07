const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// CREATE - Create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const note = new Note({ title, content });
    await note.save();
    
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating note' });
  }
});

// READ - Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching notes' });
  }
});

// READ - Get a single note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching note' });
  }
});

// UPDATE - Update a note by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while updating note' });
  }
});

// DELETE - Delete a note by ID
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully', id: req.params.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while deleting note' });
  }
});

module.exports = router;