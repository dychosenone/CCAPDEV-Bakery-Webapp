const database = require("../../models/db");
const product = require("../../models/schemas/productSchema");
const user = require("../../models/schemas/userSchema");
const transaction = require("../../models/schemas/transactionSchema");
const path = require('path');



var transactionController = {

    getTransactions : function(req, res) {

        var query = {userId : req.session.userId};
        var projection = '';
        

        var loggedIn = false;

        if(req.session.userId) loggedIn = true;
        else loggedIn = false

        if(loggedIn == false) {
            res.redirect('/');
        } else {
            database.findMany(transaction, query, projection, function(result) {
                var details = {
                    result,
                    page: 'Transactions',
                    title: "Baked Goods | Transactions",
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: null,
                    path
                };
        
                res.render('client/transactions', details);
            });
        }

    },

    getTransactionDetails : function(req, res) {
        var query = {orderId : req.query.orderId};
        var projection = '';

        database.findOne(transaction, query, projection, function(result) {
            console.log(result);
            res.send(result);
        });
    }
};

module.exports = transactionController;