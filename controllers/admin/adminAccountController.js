const database = require("../../models/db");
const users = require("../../models/schemas/userSchema");

const path = require('path');

var adminAccountController = {

    error: function(req, res) {
        var loggedIn = false;
        
        if(req.session.userId) loggedIn = true;
        else false;

        const details = {
            title: "Baked Goods | Error 404",
            loggedIn: loggedIn,
            userId: req.session.userId,
            name: req.session.name,
            error: "404: Page not Found."
        };

        res.render('admin/error', details);
    },

    getUsers : function(req, res) {
        const projection = '';
        database.findMany(users, {}, projection, function(result) {
            var loggedIn = false;

            if(req.session.userId) loggedIn = true;
            else loggedIn = false;


            if(result != null) {
                const details = {
                    result,
                    title: "Admin | User Accounts",
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: null,
                    path
                };
                res.render('admin/admin-accounts', details);
            }
            else {
                const details = {
                    result,
                    title: "Admin | User Accounts",
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: "No Products Found.",
                    path
                };
                console.log(result);
                res.render('admin/admin-accounts', details);
            }
        });
    },

    getUser : function(req, res) {
        const projection = 'userID username fullName billingAddress contact alternativeContact';
        const query = {userId: req.params.userID};
        database.findOne(users, query, projection, function(result) {
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
    }

}

module.exports = adminAccountController;