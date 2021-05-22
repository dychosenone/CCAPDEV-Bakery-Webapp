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
        const projection = '';
        const query = {_id: req.params.id};
        database.findOne(users, query, projection, function(result) {
            var loggedIn = false;

            if(req.session.userId) loggedIn = true;
            else loggedIn = false;

            if(result != null) {
                const details = {
                    result,
                    title: "Baked Goods | " + result.username,
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: null
                };

                res.render('admin/admin-edit-account', details);
            } else {
                const details = {
                    result,
                    title: "Baked Goods | Error 404",
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: "404: Page not Found."
                };
                res.render('client/error', details);
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
        var deliveryAddress = req.body.deliveryAddress;
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
                    headertitle: "Successfully Added " + Username,
                    loggedIn: true,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: null
                };
                res.render('admin/admin-success', details);
            }
        });
    });
    },

    postEdit : function(req, res) {
        var editInput = req.body;

        var loggedIn = false;
        if(req.session.userId) loggedIn = true;

        const filter = {username: editInput.Username};
        const update = { $set:
                {
                    fullName : editInput.fullName,
                    email: editInput.email,
                    contact: editInput.contact,
                    alternativeContact: editInput.alternativeContact,
                    billingAddress: editInput.billingAddress,
                    deliveryAddress: editInput.deliveryAddress,
                }
        }
        database.updateOne(users, filter, update, function(flag) {
                const projection = '';
                const query = {username: editInput.Username}
                database.findOne(users, query, projection, function(result) {
                    if(result != null) {

                        const details = {
                            result,
                            title: "Baked Goods | " + result.username,
                            headertitle: "Successfully Updated " + result.username,
                            loggedIn: loggedIn,
                            userId: req.session.userId,
                            name: req.session.name,
                            error: 'success',
                            page: 'editAccount'
                        };
                        res.render('admin/admin-success', details);
                    } else {
                        const details = {
                            result,
                            title: "Baked Goods | Error",
                            loggedIn: loggedIn,
                            userId: req.session.userId,
                            name: req.session.name,
                            error: "User not Found",
                            page: 'editAccount'
                        };
                        res.render('admin/error' + editInput.Username, details);
                    }
                });
        });
    },

    deleteUser: function(req, res) {
        var filter = {_id : req.params.id};
        var loggedIn = false;
        if(req.session.userId) loggedIn = true;

        database.deleteOne(users,filter, function(result){

            if(result!= null) {
                const details = {
                    title: "Baked Goods | Delete",
                    headertitle: "Successfully Deleted User ",
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: 'success',
                    page: 'deleteAccount'
                };
                res.render('admin/admin-success', details);
            }
        });
    },

    searchUsers: function(req, res) {
        const filter = {username: req.params.key}
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
                res.render('admin/error', details);
            }
        });
    }

}

module.exports = adminAccountController;