const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server files (html, css, client-side js)
app.use(express.static('public')); 

// Replace the existing getNotes(), saveNote(), and deleteNote() functions with the actual database operations.

// Example database operations using an array as a temporary storage for notes.
let notes = [];

const getNotes = () => {
  return notes;
};

const saveNote = (note) => {
  notes.push(note);
};

const deleteNote = (id) => {
  notes = notes.filter((note) => note.id !== id);
};

// API routes
app.get('/api/notes', (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  saveNote(newNote);
  res.sendStatus(200);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  deleteNote(noteId);
  res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
