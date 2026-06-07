import React from 'react';
import NoteCard from './NoteCard';
import './NoteList.css';

const NoteList = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20V20H4V4Z" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.5"/>
            <path d="M8 8H16" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            <path d="M8 12H16" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            <path d="M8 16H13" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          </svg>
        </div>
        <h3>No notes yet</h3>
        <p>Click the "New Note" button to create your first note</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map(note => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NoteList;