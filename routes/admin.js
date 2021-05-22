const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/img/products');
    },

    filename: function (req, file, cb){
        const {originalname} = file;
        cb(null, originalname);
    }
});
const upload = multer({storage: storage});

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
//product management
app.get('/admin-product', adminProductController.getProducts);
app.get('/admin-add-product', adminProductController.addProduct);
app.get('/admin-edit-product/:id', adminProductController.getProduct);
app.post('/admin-add-product', upload.single('uploadFile'), adminProductController.postProduct);
app.post('/admin-edit-product/:id', upload.single('uploadFile'), adminProductController.postEdit);

//user management
app.get('/admin-accounts', adminAccountController.getUsers);
app.get('/admin-delete-account/:id', adminAccountController.deleteUser);
app.get('/admin-add-account', adminAccountController.addUser);
app.get('/admin-edit-account/:id', adminAccountController.getUser);
app.post('/admin-add-account', adminAccountController.postUser);
app.post('/admin-edit-account/:id', adminAccountController.postEdit);

app.get('/admin-success', adminSuccessController.getSuccess);

module.exports = app;
