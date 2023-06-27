const fs = require('fs');
const path = require('path');
const router = require('express').Router();

// API route for retrieving notes
router.get('/notes', (req, res) => {
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/notes.json'), 'utf-8')
  );
  res.json(notes);
});

// API route for saving notes
router.post('/notes', (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/notes.json'), 'utf-8')
  );
  newNote.id = Date.now().toString();
  notes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, '../db/notes.json'),
    JSON.stringify(notes, null, 2)
  );
  res.json(newNote);
});

// API route for deleting notes
router.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/notes.json'), 'utf-8')
  );
  const updatedNotes = notes.filter((note) => note.id !== id);
  fs.writeFileSync(
    path.join(__dirname, '../db/notes.json'),
    JSON.stringify(updatedNotes, null, 2)
  );
  res.status(204).end();
});

module.exports = router;
