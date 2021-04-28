const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

//Database
const database = require('./models/db');

// Session
const session = require('express-session');

// Mongoose
const mongoose = require('mongoose');

// Mongo Session
const MongoStore = require('connect-mongo');

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

app.use(express.urlencoded({extended: true}));

// Connect to Database
database.connect();

// Define Session Details
app.use(session({
    'secret' : "4ebd020883285d698c44ec50939c0967",
    'resave': false,
    'saveUninitialized': false,
    store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/baked_goods'})
}));


app.listen(port, function () {
    console.log(`Listening at localhost: ${port}`);
})

module.exports = app;