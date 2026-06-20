const connectToDatabase = require('../_db');
const Note = require('../_note');

module.exports = async function noteByIdHandler(req, res) {
  try {
    await connectToDatabase();

    const { id } = req.query;

    if (req.method === 'GET') {
      const note = await Note.findById(id);

      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }

      return res.status(200).json(note);
    }

    if (req.method === 'PUT') {
      const { title, content } = req.body || {};

      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      const note = await Note.findByIdAndUpdate(
        id,
        { title, content, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );

      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }

      return res.status(200).json(note);
    }

    if (req.method === 'DELETE') {
      const note = await Note.findByIdAndDelete(id);

      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }

      return res.status(200).json({ message: 'Note deleted successfully', id });
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
};
