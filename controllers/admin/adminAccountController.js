const database = require("../../models/db");
const users = require("../../models/schemas/userSchema");
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

const path = require('path');

var adminAccountController = {

    getUsers : function(req, res) {
        const projection = '';
        var loggedIn = false;

        if (req.session.adminId) loggedIn = true;
        else loggedIn = false;

        if (loggedIn){
            database.findMany(users, {}, projection, function (result) {
                if (result != null) {
                    const details = {
                        result,
                        title: "Admin | User Accounts",
                        loggedIn: loggedIn,
                        userId: req.session.adminId,
                        username: req.session.adminUsername,
                        error: null,
                        path
                    };
                    res.render('admin/admin-accounts', details);
                } else {
                    const details = {
                        result,
                        title: "Admin | User Accounts",
                        loggedIn: loggedIn,
                        userId: req.session.adminId,
                        username: req.session.adminUsername,
                        error: "No Products Found.",
                        path
                    };
                    console.log(result);
                    res.render('admin/admin-accounts', details);
                }
            });
        }
        else
        {
            res.redirect('/admin/adminLogin');
        }
    },

    getUser : function(req, res) {
        const projection = '';
        const query = {_id: req.params.id};
        var loggedIn = false;

        if(req.session.adminId) loggedIn = true;
        else loggedIn = false;

        if(loggedIn){
            database.findOne(users, query, projection, function(result) {
                if(result != null) {
                    req.session.username= result.username;
                    const details = {
                        result,
                        title: "Baked Goods | " + result.username,
                        loggedIn: loggedIn,
                        userId: req.session.adminId,
                        username: req.session.adminUsername,
                        error: null
                    };

                    res.render('admin/admin-edit-account', details);
                } else {
                    const details = {
                        result,
                        title: "Baked Goods | Error 404",
                        loggedIn: loggedIn,
                        userId: req.session.adminId,
                        username: req.session.adminUsername,
                        error: "404: Page not Found."
                    };
                    res.render('admin/admin-error', details);
                }
            });
        }
        else{
            res.redirect('/admin/adminLogin');
        }

    },

    addUser : function(req,res){
        var loggedIn = false;

        if(req.session.adminId) loggedIn = true;
        else loggedIn = false;
        if(loggedIn){
            const details = {
                title: "Admin | User Accounts",
                loggedIn: loggedIn,
                userId: req.session.adminId,
                username: req.session.adminUsername,
                error: null,
                path
            };
            res.render('admin/admin-add-account', details);
        } else
        {
            res.redirect('/admin/adminLogin');
        }
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
        var errors = validationResult(req).array()
            var loggedIn = false;
            if(req.session.adminId) loggedIn = true;
            else loggedIn = false;

            if(loggedIn){
                if(errors.length > 0) {
                    console.log(errors);
                    const details = {
                        title: "Baked Goods | Register",
                        loggedIn: true,
                        userId: req.session.adminId,
                        username: req.session.adminUsername,
                        error: errors
                    }
                    res.render('admin/admin-add-account', details);
                }
                else {
                    database.addOne(users, {
                        fullName: fullName,
                        username: Username,
                        password: hash,
                        email: email,
                        contact: contact,
                        alternativeContact: alternativeContact,
                        billingAddress: billingAddress,
                        deliveryAddress: deliveryAddress
                    }, function (result) {
                        if (result != null) {
                            const details = {
                                result,
                                title: "Baked Goods | " + Username,
                                headertitle: "Successfully Added " + Username,
                                loggedIn: loggedIn,
                                userId: req.session.adminId,
                                username: req.session.adminUsername,
                                line1: Username + " has been successfully registered as a user!",
                                line2: "You can view the list of users through the User Management Tab",
                                link: "/admin/admin-accounts"
                            };
                            res.render('admin/admin-success', details);
                        }
                        else{
                            const details = {
                                result,
                                title: "Baked Goods | Error 404",
                                loggedIn: loggedIn,
                                userId: req.session.adminId,
                                username: req.session.adminUsername,
                                error: "404: Page not Found."
                            };
                            res.render('admin/admin-error', details);
                        }
                    });
                }
            }
            else{
                res.redirect('/admin/adminLogin');
            }
        });
    },

    postEdit : function(req, res) {
        var errors = validationResult(req).array()
        var editInput = req.body;

        var loggedIn = false;
        if(req.session.adminId) loggedIn = true;

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

        if(loggedIn){
            if(errors.length > 0) {
                var result= editInput;
                result.username= req.session.username;
                console.log(errors);
                const details = {
                    result,
                    title: "Baked Goods | " + result.username,
                    loggedIn : true,
                    userId: req.session.adminId,
                    username: req.session.adminUsername,
                    error: errors
                }
                res.render('admin/admin-edit-account', details);
            }
            else {
                database.updateOne(users, filter, update, function (flag) {
                    const projection = '';
                    const query = {username: editInput.Username}
                    database.findOne(users, query, projection, function (result) {
                        if (result != null) {

                            const details = {
                                result,
                                title: "Baked Goods | " + result.username,
                                headertitle: "Successfully Updated " + result.username,
                                loggedIn: loggedIn,
                                userId: req.session.adminId,
                                username: req.session.adminUsername,
                                error: null,
                                line1: "Data for " + editInput.Username + " has been successfully updates!",
                                line2: "You can view the list of users through the User Management Tab",
                                link: "/admin/admin-accounts"
                            };
                            res.render('admin/admin-success', details);
                        } else {
                            const details = {
                                result,
                                title: "Baked Goods | Error 404",
                                loggedIn: loggedIn,
                                userId: req.session.adminId,
                                username: req.session.adminUsername,
                                error: "404: Page not Found."
                            };
                            res.render('admin/admin-error', details);
                        }
                    });
                });
            }
        }
        else{
            res.redirect('/admin/adminLogin');
        }
    },

    deleteUser: function(req, res) {
        var filter = {_id : req.params.id};
        var loggedIn = false
        var Name;
        if(req.session.adminId) loggedIn = true;
        database.findOne(users, filter, 'username', function(result){
            Name = result.username;
        });
        if(loggedIn){
            database.deleteOne(users,filter, function(result){

                if(result!= null) {
                    const details = {
                        title: "Baked Goods | Delete",
                        headertitle: "Successfully Deleted User ",
                        loggedIn: loggedIn,
                        userId: req.session.adminId,
                        username: req.session.adminUsername,
                        line1: Name + " has been removed from the user database",
                        line2: "You can view the list of users through the User Management Tab",
                        link: "/admin/admin-accounts"
                    };
                    res.render('admin/admin-success', details);
                }
                else {
                    const details = {
                        result,
                        title: "Baked Goods | Error",
                        loggedIn: loggedIn,
                        userId: req.session.adminId,
                        username: req.session.adminUsername,
                        error: "Oops! Something went wrong"
                    };
                    res.render('admin/admin-error', details);
                }
            });
        }
        else{
            req.redirect('/admin/adminLogin');
        }

    },

    searchUsers: function(req, res) {
        const filter = {username: req.params.key}
        database.findMany(users, {}, projection, function(result) {
            var loggedIn = false;

            if(req.session.adminId) loggedIn = true;
            else loggedIn = false;


            if(result != null) {
                const details = {
                    result,
                    title: "Admin | User Accounts",
                    loggedIn: loggedIn,
                    userId: req.session.adminId,
                    username: req.session.adminUsername,
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
                    userId: req.session.adminId,
                    username: req.session.adminUsername,
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