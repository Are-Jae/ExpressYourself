let notes = [];
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const mongoDBUri = 'mongodb://localhost:27017/expressyourself';

mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully.');
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());






app.use(express.json());


app.use(express.urlencoded({ extended: false }));


app.use(express.static('public')); 




const saveNote = (note) => {
  notes.push(note);
};

// Function to delete a note
const deleteNote = (id) => {
  notes = notes.filter((note) => note.id !== id);
};

app.get('/api/notes', (req, res) => {
  // Return the notes from the notes array
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
