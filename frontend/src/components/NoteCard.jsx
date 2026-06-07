import React from 'react';
import './NoteCard.css';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="note-card">
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button 
            className="edit-btn" 
            onClick={() => onEdit(note)}
            aria-label="Edit note"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M15 5L19 9" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button 
            className="delete-btn" 
            onClick={() => onDelete(note._id)}
            aria-label="Delete note"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10 11V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M14 11V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6 7L8 21H16L18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 4H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      <p className="note-content">{truncateContent(note.content)}</p>
      <div className="note-footer">
        <span className="note-date">Updated {formatDate(note.updatedAt)}</span>
      </div>
    </div>
  );
};

export default NoteCard;