const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

//Database
const database = require(path.join(__dirname + '/models/db'));

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
const clientRoute = require(path.join(__dirname + '/routes/client'));
const adminRoute = require(path.join(__dirname + '/routes/admin'));
const { body } = require('express-validator');

// Set View Engine
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

// Set Public Folder
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/images')));

// Define Session Details

app.use('/admin', session({
    'name' : 'admin',
    'secret' : "6mEyFi0fxZhdmz2ON26GdZnUCdGIWbCY",
    'resave': false,
    'saveUninitialized': false,
    store: MongoStore.create({mongoUrl: "mongodb://localhost:27017/baked_goods" || process.env.MONGO_URI})
}));

app.use('/', session({
    'name' : 'client',
    'secret' : "4ebd020883285d698c44ec50939c0967",
    'resave': false,
    'saveUninitialized': false,
    store: MongoStore.create({mongoUrl: "mongodb://localhost:27017/baked_goods" || process.env.MONGO_URI})
}));


// Route Definitions
app.use('/', clientRoute);
app.use('/admin', adminRoute);

// Controller 404
const controller = require(path.join(__dirname + '/controllers/client/controller'));
app.use(controller.error);

app.use(express.urlencoded({extended: true}));

// Connect to Database
database.connect();


app.listen(port, function () {
    console.log(`Listening to port ${port}`);
})

module.exports = app;