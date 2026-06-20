const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

noteSchema.pre('save', function setUpdatedAt(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.models.Note || mongoose.model('Note', noteSchema);
