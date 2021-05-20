const database = require("../../models/db");
const product = require("../../models/schemas/productSchema");
const path = require('path');

var cartController = {
    
    getCart : function(req, res) {

        var loggedIn = false;

        if(req.session.userId) loggedIn = true;
        else loggedIn = false

        console.log(req.session.cart);
        var details = {
            page: 'Cart',
            title: "Baked Goods | Cart",
            loggedIn: loggedIn,
            userId: req.session.userId,
            name: req.session.name,
            error: null,
            cartContent: req.session.cart,
            path
        };

        res.render('client/cart', details);
    }

};

module.exports = cartController;