const express = require('express');

const controller = require('../controllers/client/controller');

const productController = require("../controllers/client/productController");
const loginController = require('../controllers/client/loginController');

const accountController = require('../controllers/client/accountController');

const validator = require('../helpers/validator');

const app = express.Router();

app.get('/', controller.getIndex);

app.get('/logout', controller.getLogout);

app.get('/login', loginController.getLogin);

app.post('/login', loginController.postLogin);

app.get('/products', productController.getProducts);

app.get('/products/:productId', productController.getProduct);

app.get('/account', accountController.getAccount);

app.use(controller.error);

module.exports = app;
