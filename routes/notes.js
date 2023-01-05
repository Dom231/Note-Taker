const express = require('express');
const { readFromFile, readAndAppend } = require('../helper/fsUtils');
const uuid = require('../helper/uuids');

const app = express();

app.get('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  
  
  app.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const {title, text } = req.body
  
    
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
       title,
       text,
       id: uuid()
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`note added successfully 🚀`);
    } else {
      res.error('Error in adding a note');
    }
  });

  module.exports = app