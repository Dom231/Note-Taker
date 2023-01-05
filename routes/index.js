const express = require('express');

// Import our modular routers for /tips and /feedback
const noteRoutes = require('./notes');


const app = express();

app.use('/', noteRoutes);




module.exports = app;