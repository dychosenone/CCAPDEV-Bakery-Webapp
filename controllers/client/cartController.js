const database = require("../../models/db");
const product = require("../../models/schemas/productSchema");
const user = require("../../models/schemas/userSchema");
const transaction = require("../../models/schemas/transactionSchema");
const path = require('path');

var cartController = {
    
    getCart : function(req, res) {

        var loggedIn = false;

        if(req.session.userId) loggedIn = true;
        else loggedIn = false

        if(loggedIn == false) {
            res.redirect('/');
        } else {
            var subtotal = 0;

            req.session.cart.forEach(function(element){
                subtotal += element.price;
            });
    
            var total = subtotal + 150;
    
            var details = {
                page: 'Cart',
                title: "Baked Goods | Cart",
                loggedIn: loggedIn,
                userId: req.session.userId,
                name: req.session.name,
                error: null,
                cartContent: req.session.cart,
                subtotal: subtotal, 
                delivery: 150,
                total: total,
                path
            };
    
            res.render('client/cart', details);
        }

    },

    getDeleteCartItem : function(req, res) {
        var productId = req.query.productId;
        var productIndex = req.session.cart.findIndex(x => x.productId == productId);

        if(productIndex > -1) {
            req.session.cart.splice(productIndex, 1);
            res.send({status : "success", message: "Successfully removed item from cart."});
        } else {
            res.send({status : "error", message: "Error: Failed to remove item from cart."});
        }

    },

    getCheckout : function(req, res) {

        var loggedIn = false;

        if(req.session.userId) loggedIn = true;
        else loggedIn = false

        if(loggedIn == false) {
            res.redirect('/');
        } else {
            // Get Cart Details
            var subtotal = 0;

            req.session.cart.forEach(function(element){
                subtotal += element.price;
            });

            var total = subtotal + 150;

            const query = {_id : req.session.userId};
            const projection = '';

            database.findOne(user, query, projection, function(result) {


                var details = {
                    result,
                    loggedIn,
                    page: 'Checkout',
                    delivery: 150,
                    total : total,
                    subtotal : subtotal,
                    cartContent : req.session.cart,
                    userId: req.session.userId,
                    name: req.session.name,
                    title : 'Baked Goods | Checkout'
                };

                res.render('client/checkout', details);

            });
                
        }
    },

    getCheckoutItems : function(req, res) {
        
        var loggedIn = false;

        if(req.session.userId) loggedIn = true;
        else loggedIn = false
        
        var query = {_id : req.session.userId};
        var projection = '';

        database.findOne(user, query, projection, function(result) {

            var subtotal = 0;

            req.session.cart.forEach(function(element){
                subtotal += element.price;
            });

            var doc = {
                userId : req.session.userId,
                name : result.fullName,
                status : 'pending',
                subtotal : subtotal,
                deliveryFee : 150,
                deliveryAddress : result.deliveryAddress,
                billingAddress : result.billingAddress,
                contactNumber : result.contact,
                alternativeContactNumber : result.alternativeContact,
                orders : req.session.cart
            };

            console.log(doc);
            database.addOne(transaction, doc, function(flag) {
                if(flag) {
                    console.log(flag);
                    req.session.cart = [];
                    req.session.save();

                    req.session.newOrder = true;
                    req.session.save();

                    res.json({status: "success", redirect: '/checkoutsuccess'});

                } else {
                    res.json({status : 'error', message : 'There was an error processing your order. Please try again.'});
                }
            });
        });

    },

    getCheckoutSuccess : function(req, res) {

        var details = {
            title : 'Baked Goods | Success',
            loggedIn,
            userId: req.session.userId,
            name: req.session.name
        };

        var loggedIn = false;

        if(req.session.userId) loggedIn = true;
        else loggedIn = false

        if(req.session.newOrder == false) {
            res.redirect('/');
        } else {
            req.session.newOrder = false;
            req.session.save();

            res.render('client/checkout-success', details);
        }

    }

};

module.exports = cartController;