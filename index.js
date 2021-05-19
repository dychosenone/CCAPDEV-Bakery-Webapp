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

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//Routes
const clientRoute = require('./routes/client');
const adminRoute = require('./routes/admin');
const { body } = require('express-validator');

// Set View Engine
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

// Set Public Folder
app.use(express.static(path.join(__dirname + '/public')));

// Define Session Details
app.use(session({
    'secret' : "4ebd020883285d698c44ec50939c0967",
    'resave': false,
    'saveUninitialized': true,
    store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/baked_goods'})
}));


// Route Definitions
app.use('/', clientRoute);
app.use('/admin', adminRoute);

// Controller 404
const controller = require('./controllers/client/controller');
app.use(controller.error);

app.use(express.urlencoded({extended: true}));

// Connect to Database
database.connect();


app.listen(port, function () {
    console.log(`Listening at localhost: ${port}`);
})

module.exports = app;