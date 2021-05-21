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
    },

    getCheckoutItems : function(req, res) {
        
        var query = {_id : req.session.userId};
        var projection = '';

        database.findOne(user, query, projection, function(result) {
            var doc = {
                date : new Date(),
                userId : req.session.userId,
                name : result.name,
                status : 'pending',
                deliveryAddress : result.deliveryAddress,
                billingAddress : result.billingAddress,
                contactNumber : result.contactNumber,
                alternativeContactNumber : result.alternativeContact,
                orders : req.session.cart
            };
            database.addOne(transaction, doc, function(flag) {
                if(flag) {
                    res.redirect('/');
                }
            });
    
        });



    }

};

module.exports = cartController;