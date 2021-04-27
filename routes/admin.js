const express = require('express');

const app = express.Router();

app.get('/', function (req, res) {
    res.render('adminlogin', {title: 'Admin Login'});
});

module.exports = app;
