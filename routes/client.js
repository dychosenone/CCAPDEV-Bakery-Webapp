const express = require('express');

const productController = require("../controllers/client/productController");

const app = express.Router();

app.get('/', function (req, res) {
    res.render('client/index', {title: 'Baked Goods'});
});

app.get('/products', productController.getProducts);

app.get('/products/:productId', productController.getProduct);

module.exports = app;
