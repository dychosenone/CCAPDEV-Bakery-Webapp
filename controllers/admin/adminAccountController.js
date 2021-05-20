const database = require("../../models/db");
const users = require("../../models/schemas/userSchema");
const bcrypt = require('bcrypt');


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
    },

    addUser : function(req,res){
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
        res.render('admin/admin-add-account', details);
    },

    postUser : function(req,res){
        bcrypt.hash(req.body.Password, 12, function(err, hash){
        var fullName = req.body.fullName;
        var Username = req.body.Username;
        var billingAddress = req.body.billingAddress;
        var deliveryAddress = req.body.billingAddress;
        var email = req.body.email;
        var contact = req.body.contact;
        var alternativeContact = req.body.alternativeContact;

        database.addOne(users, {
            fullName: fullName,
            username: Username,
            password: hash,
            email: email,
            contact: contact,
            alternativeContact: alternativeContact,
            billingAddress: billingAddress,
            deliveryAddress: deliveryAddress
        }, function(result){
            if(result){
                const details = {
                    result,
                    title: "Baked Goods | " + Username,
                    loggedIn: true,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: null
                };
                res.render('admin/admin-success', details);
            }


        });

    });
    }

}

module.exports = adminAccountController;