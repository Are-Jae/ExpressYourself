const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const mongoDBUri = 'mongodb://localhost:27017/your-database-name';

mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully.');
});


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server files (html, css, client-side js)
app.use(express.static('public')); 




// let notes = [];

const Note = require('./models/note'); 

const getNotes = async () => {
  try {
    const notes = await Note.find(); 
    return notes;
  } catch (error) {
    console.error('Error while fetching notes:', error);
    return []; 
  }
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
