const express = require('express');
const path = require('path');
const { readFromFile, readAndAppend } = require('./helper/fsUtils');

const dbData = require('./db/db.json');

const PORT = 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes',(req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const {title, text } = req.body

  
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
     title,
     text,
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`note added successfully 🚀`);
  } else {
    res.error('Error in adding a note');
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});