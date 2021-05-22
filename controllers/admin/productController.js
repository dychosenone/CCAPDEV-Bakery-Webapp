const database = require("../../models/db");
const product = require("../../models/schemas/productSchema");
const multer = require('multer');
const fs = require('fs');

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
        const query = {_id: req.params.id};
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

                res.render('admin/admin-edit-product', details);
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
    },

    postProduct : function(req,res){
            var Image = req.file.filename;
            var Name = req.body.Name;
            var Description = req.body.Description;
            var sizes = [
                {
                    size: req.body.size1,
                    price: req.body.price1
                }
            ];

            if(req.body.size2 != null){
                sizes.push({size: req.body.size2, price: req.body.price2});
                if(req.body.size3 != null)
                    sizes.push({size: req.body.size3, price: req.body.price3});
            }





            database.addOne(product, {
                name: Name,
                description: Description,
                sizes: sizes,
                image: Image
            }, function(result){
                if(result != null){
                    const details = {
                        result,
                        title: "Baked Goods | " + Name,
                        headertitle: "Successfully added " + Name,
                        loggedIn: true,
                        userId: req.session.userId,
                        name: req.session.name,
                        error: null
                    };
                    res.render('admin/admin-success', details);
                }
            });
    },

    postEdit : function(req, res){

        if(req.file!= null)
            var Image = req.file.filename;
        var Name = req.body.Name;
        var Description = req.body.Description;
        var sizes = [
            {
                size: req.body.size1,
                price: req.body.price1
            }
        ];

        if(req.body.size2 != null){
            sizes.push({size: req.body.size2, price: req.body.price2});
            if(req.body.size3 != null)
                sizes.push({size: req.body.size3, price: req.body.price3});
        }

        var loggedIn = false;
        if(req.session.userId) loggedIn = true;

        const filter = {name: Name};
        const update = { $set:
                {
                    name: Name,
                    description: Description,
                    sizes: sizes,
                    image: Image
                }
        }
        database.updateOne(product, filter, update, function(flag) {
            const projection = '';
            const query = {name: Name}
            database.findOne(product, query, projection, function(result) {
                if(result != null) {

                    const details = {
                        result,
                        title: "Baked Goods | " + Name,
                        headertitle: "Successfully Updated " + Name,
                        loggedIn: loggedIn,
                        userId: req.session.userId,
                        name: req.session.name,
                        error: 'success',
                        page: 'editProduct'
                    };
                    res.render('admin/admin-success', details);
                } else {
                    const details = {
                        result,
                        title: "Baked Goods | Error",
                        loggedIn: loggedIn,
                        userId: req.session.userId,
                        name: req.session.name,
                        page: 'editProduct'
                    };
                    res.render('admin/error' + editInput.Username, details);
                }
            });
        });
    }
}


module.exports = productController;