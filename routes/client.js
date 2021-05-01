const express = require('express');

const controller = require('../controllers/client/controller');

const productController = require("../controllers/client/productController");
const loginController = require('../controllers/client/loginController');
const registerController = require('../controllers/client/registerController');

const accountController = require('../controllers/client/accountController');

const validator = require('../helpers/validator');

const app = express.Router();

app.get('/', controller.getIndex);

app.get('/about', controller.getAbout);

app.get('/logout', controller.getLogout);

app.get('/register', registerController.getRegister);

app.post('/register', validator.registerValidator(), registerController.postRegister);

app.get('/login', loginController.getLogin);

app.post('/login', loginController.postLogin);

app.get('/products', productController.getProducts);

app.get('/products/:productId', productController.getProduct);

app.get('/account', accountController.getAccount);

app.get('/editAccount', accountController.getEditAccount);

app.post('/editAccount', accountController.postEditAccount);

app.use(controller.error);

module.exports = app;
