const database = require("../../models/db");
const product = require("../../models/schemas/productSchema");
const path = require('path');

var productController = {

    getProducts : function(req, res) {
        const projection = 'name description image productId';
        database.findMany(product, {}, projection, function(result) {

            if(result != null) {
                res.render('client/products', {title: "Hello", result, path});
            }
            else {
                const details = {
                    title : "Our Products | Baked Goods",
                    error: "No Products Found"
                };
                console.log(result);
                res.render('client/products', details);
            }
        });
    },

    getProduct : function(req, res) {
        const projection = '';
        const query = {productId: req.params.productId};
        database.findOne(product, query, projection, function(result) {
            if(result != null) {
                res.render('client/product', {result, title: "Baked Goods | " + result.name});
            } else {
                res.render('client/error', {title: 'Baked Goods | Error 404', error: '404: Page not Found.'});
            }
        });
    }
}

module.exports = productController;