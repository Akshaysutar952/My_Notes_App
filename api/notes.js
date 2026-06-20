const connectToDatabase = require('./_db');
const Note = require('./_note');

module.exports = async function notesHandler(req, res) {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const notes = await Note.find().sort({ updatedAt: -1 });
      return res.status(200).json(notes);
    }

    if (req.method === 'POST') {
      const { title, content } = req.body || {};

      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      const note = await Note.create({ title, content });
      return res.status(201).json(note);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
};
