const express = require('express');

const productController = require("../controllers/client/productController");
const loginController = require('../controllers/client/loginController');

const app = express.Router();

app.get('/', function (req, res) {
    res.render('client/index', {title: 'Baked Goods'});
});

app.get('/login', loginController.getLogin);

app.get('/products', productController.getProducts);

app.get('/products/:productId', productController.getProduct);


module.exports = app;
