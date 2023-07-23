
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  text: String,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
