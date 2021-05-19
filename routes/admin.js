const express = require('express');

const adminController = require('../controllers/admin/adminController');

const adminLoginController = require('../controllers/admin/adminLoginController');

const adminProductController = require('../controllers/admin/productController');

const app = express.Router();

app.get('/', function (req, res) {
    res.render('/adminlogin', {title: 'Admin Login'});
});

app.get('/adminlogin', adminLoginController.getLogin);

app.post('/adminlogin', adminLoginController.postLogin);

app.get('/admin-product', adminProductController.getProducts);


module.exports = app;
