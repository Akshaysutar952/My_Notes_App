import React, { useState, useEffect } from 'react';
import './NoteEditor.css';

const NoteEditor = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
    setErrors({});
  }, [note]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (title.length > 100) newErrors.title = 'Title must be less than 100 characters';
    if (!content.trim()) newErrors.content = 'Content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        title: title.trim(),
        content: content.trim()
      });
    }
  };

  return (
    <div className="note-editor">
      <div className="editor-header">
        <h2>{note ? 'Edit Note' : 'Create New Note'}</h2>
        <button className="close-btn" onClick={onCancel}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
          <span className="char-count">{title.length}/100</span>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note content here..."
            rows={10}
            className={errors.content ? 'error' : ''}
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>

        <div className="editor-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {note ? 'Update Note' : 'Save Note'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;