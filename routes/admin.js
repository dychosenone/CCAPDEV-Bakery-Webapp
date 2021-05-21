const express = require('express');

const adminController = require('../controllers/admin/adminController');

const adminLoginController = require('../controllers/admin/adminLoginController');

const adminProductController = require('../controllers/admin/productController');

const adminAccountController = require('../controllers/admin/adminAccountController');

const adminSuccessController = require('../controllers/admin/adminSuccessController');

const app = express.Router();

app.get('/', function (req, res) {
    res.render('/adminlogin', {title: 'Admin Login'});
});

app.get('/adminlogin', adminLoginController.getLogin);

app.post('/adminlogin', adminLoginController.postLogin);

app.get('/admin-product', adminProductController.getProducts);

app.get('/admin-add-product', adminProductController.addProduct);

app.post('/admin-add-product', adminProductController.postProduct);

app.get('/admin-accounts', adminAccountController.getUsers);

app.delete('/admin-accounts/:id', adminAccountController.deleteUser)

app.get('/admin-add-account', adminAccountController.addUser);

app.get('/admin-edit-account/:id', adminAccountController.getUser);

app.post('/admin-add-account', adminAccountController.postUser);

app.post('/admin-edit-account', adminAccountController.postEdit);

app.get('/admin-success', adminSuccessController.getSuccess);

module.exports = app;
