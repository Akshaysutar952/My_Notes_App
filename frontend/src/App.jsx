import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || '/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setNotes(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('Failed to load notes. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (noteData) => {
    try {
      const response = await axios.post(API_URL, noteData);
      setNotes([response.data, ...notes]);
      setIsEditing(false);
      setSelectedNote(null);
    } catch (err) {
      console.error('Error creating note:', err);
      setError('Failed to create note. Please try again.');
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, noteData);
      setNotes(notes.map(note => note._id === id ? response.data : note));
      setIsEditing(false);
      setSelectedNote(null);
    } catch (err) {
      console.error('Error updating note:', err);
      setError('Failed to update note. Please try again.');
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes(notes.filter(note => note._id !== id));
      if (selectedNote?._id === id) {
        setSelectedNote(null);
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Error deleting note:', err);
      setError('Failed to delete note. Please try again.');
    }
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setIsEditing(true);
  };

  const handleNewNote = () => {
    setSelectedNote(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedNote(null);
  };

  const handleSaveNote = (noteData) => {
    if (selectedNote) {
      updateNote(selectedNote._id, noteData);
    } else {
      createNote(noteData);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20V20H4V4Z" stroke="#3b82f6" strokeWidth="1.5" fill="none"/>
              <path d="M8 7H16" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 12H16" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 17H13" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <h1>Notes<span>Flow</span></h1>
          </div>
          <button className="new-note-btn" onClick={handleNewNote}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            New Note
          </button>
        </div>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-toast">
            <span>{error}</span>
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        <div className="container">
          {isEditing ? (
            <div className="editor-wrapper">
              <NoteEditor
                note={selectedNote}
                onSave={handleSaveNote}
                onCancel={handleCancelEdit}
              />
            </div>
          ) : (
            <>
              <div className="welcome-section">
                <h2>Your Notes</h2>
                <p>{notes.length} {notes.length === 1 ? 'note' : 'notes'} saved</p>
              </div>
              {loading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading your notes...</p>
                </div>
              ) : (
                <NoteList
                  notes={notes}
                  onEdit={handleEditNote}
                  onDelete={deleteNote}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
