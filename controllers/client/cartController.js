const database = require("../../models/db");
const product = require("../../models/schemas/productSchema");
const path = require('path');

var cartController = {
    
    getCart : function(req, res) {

        var loggedIn = false;

        if(req.session.userId) loggedIn = true;
        else loggedIn = false

        console.log(req.session.cart);

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

    }

};

module.exports = cartController;