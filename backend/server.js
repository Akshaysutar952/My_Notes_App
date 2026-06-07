const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Schema and Model
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'General'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('Note', noteSchema);

// Routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'Notes API is running!',
        status: 'active',
        time: new Date().toISOString()
    });
});

// Get all notes
app.get('/api/notes', async (req, res) => {
    console.log('📋 Fetching all notes');
    
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        console.error('❌ Error fetching notes:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create note
app.post('/api/notes', async (req, res) => {
    console.log('📝 Received note creation request');
    console.log('Body:', req.body);
    
    try {
        const note = new Note({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category || 'General'
        });
        
        await note.save();
        console.log('✅ Note saved successfully');
        res.status(201).json(note);
    } catch (error) {
        console.error('❌ Error saving note:', error);
        res.status(500).json({ 
            error: 'Failed to create note',
            details: error.message 
        });
    }
});

// Update note (ADD THIS)
app.put('/api/notes/:id', async (req, res) => {
    console.log('✏️ Updating note with ID:', req.params.id);
    console.log('Update data:', req.body);
    
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                content: req.body.content,
                category: req.body.category || 'General'
            },
            { new: true, runValidators: true }
        );
        
        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        
        console.log('✅ Note updated successfully');
        res.json(updatedNote);
    } catch (error) {
        console.error('❌ Error updating note:', error);
        res.status(500).json({ error: error.message });
    }
});

// Delete note (ADD THIS)
app.delete('/api/notes/:id', async (req, res) => {
    console.log('🗑️ Deleting note with ID:', req.params.id);
    
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        
        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        
        console.log('✅ Note deleted successfully');
        res.json({ message: 'Note deleted successfully', note: deletedNote });
    } catch (error) {
        console.error('❌ Error deleting note:', error);
        res.status(500).json({ error: error.message });
    }
});

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notes_app';

mongoose.connect(mongoURI)
    .then(() => {
        console.log('✅ MongoDB connected successfully');
        console.log('📊 Database:', mongoose.connection.name);
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
    });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📍 Test URL: http://localhost:${PORT}`);
    console.log(`📝 Create note: POST to http://localhost:${PORT}/api/notes`);
    console.log(`✏️ Update note: PUT to http://localhost:${PORT}/api/notes/:id`);
    console.log(`🗑️ Delete note: DELETE to http://localhost:${PORT}/api/notes/:id`);
});