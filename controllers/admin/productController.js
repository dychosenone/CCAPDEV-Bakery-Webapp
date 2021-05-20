const database = require("../../models/db");
const product = require("../../models/schemas/productSchema");
const path = require('path');

var productController = {

    getProducts : function(req, res) {
        const projection = '';
        database.findMany(product, {}, projection, function(result) {
            var loggedIn = false;

            if(req.session.userId) loggedIn = true;
            else loggedIn = false;


            if(result != null) {
                const details = {
                    result,
                    title: "Admin | Admin Products",
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: null,
                    path
                };
                res.render('admin/admin-product', details);
            }
            else {
                const details = {
                    result,
                    title: "Admin | No Products Found",
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: "No Products Found.",
                    path
                };
                console.log(result);
                res.render('admin/admin-product-empty', details);
            }
        });
    },

    getProduct : function(req, res) {
        const projection = '';
        const query = {productId: req.params.productId};
        database.findOne(product, query, projection, function(result) {
            var loggedIn = false;

            if(req.session.userId) loggedIn = true;
            else loggedIn = false;

            if(result != null) {

                const details = {
                    result,
                    title: "Baked Goods | " + result.name,
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: null
                };

                res.render('admin/product', details);
            } else {
                const details = {
                    result,
                    title: "Baked Goods | Error 404",
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: "404: Page not Found."
                };
                res.render('admin/error', details);
            }
        });
    },

    addProduct : function(req,res){
        var loggedIn = false;

        if(req.session.userId) loggedIn = true;
        else loggedIn = false;

        const details = {
            title: "Admin | User Accounts",
            loggedIn: loggedIn,
            userId: req.session.userId,
            name: req.session.name,
            error: null,
            path
        };
        res.render('admin/admin-add-product', details)
    }
}

module.exports = productController;