const express = require('express');

const adminController = require('../controllers/admin/adminController');

//const adminLoginController = require('../controllers/admin/adminLoginController');


const app = express.Router();

app.get('/admin', function (req, res) {
    res.render('adminlogin', {title: 'Admin Login'});
});

//app.get('/adminlogin', adminLoginController.getLogin);

//app.post('/adminlogin', adminLoginController.postLogin);

//app.use(adminController.error);


module.exports = app;
