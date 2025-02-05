const express = require('express');
const Note = require('../models/Note');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all notes for user
router.get('/', authMiddleware, async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(notes);
});

// Create a new note
router.post('/', authMiddleware, async (req, res) => {
  const { content } = req.body;
  const note = new Note({ content, user: req.user.id });
  await note.save();
  res.json(note);
});

// Delete a note
router.delete('/:id', authMiddleware, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
});

module.exports = router;
