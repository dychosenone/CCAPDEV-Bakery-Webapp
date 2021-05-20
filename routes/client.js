const express = require('express');

const controller = require('../controllers/client/controller');

const productController = require("../controllers/client/productController");
const loginController = require('../controllers/client/loginController');
const registerController = require('../controllers/client/registerController');

const accountController = require('../controllers/client/accountController');

const cartController = require('../controllers/client/cartController');

const validator = require('../helpers/validator');

const app = express.Router();

app.get('/', controller.getIndex);

app.get('/about', controller.getAbout);

app.get('/logout', controller.getLogout);

app.get('/register', registerController.getRegister);

app.post('/register', validator.registerValidator(), registerController.postRegister);

app.get('/registerSuccess', registerController.getRegisterSuccess);

app.get('/login', loginController.getLogin);

app.post('/login', loginController.postLogin);

app.get('/products', productController.getProducts);

app.get('/products/:productId', productController.getProduct);

app.post('/products/:productId/addReview', productController.postReview);

app.get('/products/:productId/deleteReview', productController.deleteReview);

app.get('/account', accountController.getAccount);

app.get('/editAccount', accountController.getEditAccount);

app.post('/editAccount', accountController.postEditAccount);

app.get('/addToCart', productController.getAddToCart);

app.get('/cart', cartController.getCart);

app.get('/cart/deleteItem', cartController.getDeleteCartItem);

module.exports = app;
