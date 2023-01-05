const express = require('express');
const path = require('path');
const apiRoutes = require("./routes")


const dbData = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes',(req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});



app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});