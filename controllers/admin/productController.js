const database = require("../../models/db");
const product = require("../../models/schemas/productSchema");
const multer = require('multer');
const fs = require('fs');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890', 10);

const path = require('path');

var productController = {

    getProducts : function(req, res) {
        const projection = '';
        database.findMany(product, {}, projection, function(result) {
            var loggedIn = false;

            if(req.session.userId) loggedIn = true;
            else loggedIn = false;

            if(loggedIn){
                if(result != null) {
                    const details = {
                        result,
                        title: "Admin | Admin Products",
                        loggedIn: loggedIn,
                        userId: req.session.userId,
                        username: req.session.adminUsername,
                        error: null,
                        path
                    };
                    res.render('admin/admin-product', details);
                }
                else {
                    const details = {
                        result,
                        title: "Baked Goods | Error 404",
                        loggedIn: loggedIn,
                        userId: req.session.userId,
                        username: req.session.adminUsername,
                        error: "404: Page not Found."
                    };
                    res.render('admin/admin-error', details);
                }
            }
            else {
                res.redirect('/admin/adminLogin');
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

            if(loggedIn){
                if(result != null) {
                    req.session.pName = result.name;
                    const details = {
                        result,
                        title: "Baked Goods | " + result.name,
                        loggedIn: loggedIn,
                        userId: req.session.userId,
                        username: req.session.adminUsername,
                        error: null
                    };

                    res.render('admin/admin-edit-product', details);
                } else {
                    const details = {
                        result,
                        title: "Baked Goods | Error 404",
                        loggedIn: loggedIn,
                        userId: req.session.userId,
                        username: req.session.adminUsername,
                        error: "404: Page not Found."
                    };
                    res.render('admin/admin-error', details);
                }
            }
            else{
                res.redirect('/admin/adminLogin');
            }
        });
    },

    addProduct : function(req,res){
        var loggedIn = false;

        if(req.session.userId) loggedIn = true;
        else loggedIn = false;

        if(loggedIn){
            const details = {
                title: "Admin | User Accounts",
                loggedIn: loggedIn,
                userId: req.session.userId,
                username: req.session.adminUsername,
                error: null,
                path
            };
            res.render('admin/admin-add-product', details)
        }
        else{
            res.redirect('/admin/adminLogin');
        }

    },

    postProduct : function(req,res){
            var prodID = nanoid();
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

            if(loggedIn){
                database.addOne(product, {
                    productId: prodID,
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
                            username: req.session.adminUsername,
                            line1: Name + " has been successfully added to the list of products!",
                            line2: "You can view the list of products through the Product Management Tab",
                            link: "/admin/admin-product"
                        };
                        res.render('admin/admin-success', details);
                    }
                    else{
                        const details = {
                            result,
                            title: "Baked Goods | Error",
                            loggedIn: true,
                            userId: req.session.userId,
                            username: req.session.adminUsername,
                            error: "Oops! something went wrong with adding " + Name,
                        };
                        res.render('admin/admin-error', details);
                    }
                });
            }
            else{
                res.redirect('/admin/adminLogin');
            }
    },

    postEdit : function(req, res){
        var Image;

        if(req.file!= null){
            Image = req.file.filename;
          if(fs.existsSync('public/img/products/'+ req.body.imgName))
            fs.unlinkSync('public/img/products/'+ req.body.imgName);
        }
        else
            Image = req.body.imgName;

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

        const filter = {_id: req.params.id};
        const update = { $set:
                {
                    name: Name,
                    description: Description,
                    sizes: sizes,
                    image: Image
                }
        }

        if(loggedIn){
            database.updateOne(product, filter, update, function(flag) {
                const projection = '';
                const query = {_id: req.params.id}
                database.findOne(product, query, projection, function(result) {
                    if(result != null) {

                        const details = {
                            result,
                            title: "Baked Goods | " + Name,
                            headertitle: "Successfully Updated " + Name,
                            loggedIn: loggedIn,
                            userId: req.session.userId,
                            username: req.session.adminUsername,
                            line1: "Data for " + Name + " been successfully updated!",
                            line2: "You can view the list of products through the Product Management Tab",
                            link: "/admin/admin-product"
                        };
                        res.render('admin/admin-success', details);
                    } else {
                        const details = {
                            result,
                            title: "Baked Goods | Error",
                            loggedIn: loggedIn,
                            userId: req.session.userId,
                            username: req.session.adminUsername,
                            error: "Oops! something went wrong with updating" + Name
                        };
                        res.render('admin/admin-error', details);
                    }
                });
            });
        }
        else {
            res.redirect('/admin/adminLogin');
        }
    },

    deleteProduct: function(req, res) {
        var fs = require('fs');
        var filter = {_id : req.params.id};
        var loggedIn = false;
        var projection = 'image username';
        if(req.session.userId) loggedIn = true;

        if(loggedIn){
            database.findOne(product, filter, projection,function(result){
                var img = result.image;
                var Name = result.name;

                if(img != null && fs.existsSync('public/img/products/'+ img))
                    fs.unlinkSync('public/img/products/'+ img);

                database.deleteOne(product,filter,  function(result){

                    if(result!= null) {
                        const details = {
                            title: "Baked Goods | Delete Successful",
                            headertitle: "Successfully Deleted Product",
                            loggedIn: loggedIn,
                            userId: req.session.userId,
                            username: req.session.adminUsername,
                            line1: Name + " has been removed from the list of products.",
                            line2: "You can view the list of products through the Product Management Tab",
                            link: "/admin/admin-product"
                        };
                        res.render('admin/admin-success', details);
                    }
                    else{
                        const details = {
                            result,
                            title: "Baked Goods | Error",
                            loggedIn: loggedIn,
                            userId: req.session.userId,
                            username: req.session.adminUsername,
                            error: "Oops! something went wrong in deleting" + Name
                        };
                        res.render('admin/admin-error', details);
                    }
                });
            })
        }
        else{
            res.redirect('/admin/adminLogin');
        }
    },

    searchProducts: function(req,res){
        const projection = '';
        const query ={name: req.body.searchInput}
        database.findMany(product, query, projection, function(result) {
            var loggedIn = false;

            if(req.session.userId) loggedIn = true;
            else loggedIn = false;

            if(loggedIn){
                if(result != null) {
                    const details = {
                        result,
                        title: "Admin | Admin Products",
                        loggedIn: loggedIn,
                        userId: req.session.userId,
                        username: req.session.adminUsername,
                        error: null,
                        path
                    };
                    res.render('admin/admin-product', details);
                }
                else {
                    const details = {
                        result,
                        title: "Baked Goods | Error",
                        loggedIn: loggedIn,
                        userId: req.session.userId,
                        username: req.session.adminUsername,
                        error: "Oops! something went wrong with searching for the products"
                    };
                    res.render('admin/admin-error', details);
                }
            }
            else{
                res.redirect('/admin/adminLogin');
            }
        });
    }
}


module.exports = productController;