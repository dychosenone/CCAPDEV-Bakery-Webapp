const database = require("../../models/db");
const user = require("../../models/schemas/AdminUserSchema");
const orders = require("../../models/schemas/transactionSchema");

const path = require('path');

var adminController = {

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

    getIndex : function (req, res) {
        const projection = '';
        const query = {};

        database.findMany(orders, query, projection, function(result) {
            var loggedIn = false;

            if(req.session.userId) loggedIn = true;
            else loggedIn = false;
            if(result != null) {
                const details = {
                    result,
                    title: "Admin | Active Orders",
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: null,
                    path
                };
                res.render('admin/adminIndex', details);
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
                res.render('admin/error', details);
            }
        });
    },

    getAbout : function (req, res) {
        if(req.session.userId) {
            res.render('admin/index', {title: 'Baked Goods', loggedIn: true, name: req.session.name});
        } else {
            res.render('admin/about', {title: 'Baked Goods | About', loggedIn: false});
        }
    },

    getLogout : function(req, res) {
        req.session.destroy(function(error) {
            if(error == true) {
                throw error;
            }
            res.redirect('/admin');
        })
    }

}

module.exports = adminController;