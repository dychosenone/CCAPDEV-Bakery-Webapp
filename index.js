const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

//Database
const database = require('./models/db');

//Routes
const clientRoute = require('./routes/client');
const adminRoute = require('./routes/admin');

// Set View Engine
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

// Set Public Folder
app.use(express.static(path.join(__dirname + '/public')));

// Route Definitions
app.use('/', clientRoute);
app.use('/admin', adminRoute);

// Connect to Database
database.connect();

app.listen(port, function () {
    console.log(`Listening at localhost:${port}`);
})

module.exports = app;