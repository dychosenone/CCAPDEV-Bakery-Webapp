const database = require("../../models/db");
const admin = require("../../models/schemas/AdminUserSchema");
const orders = require("../../models/schemas/transactionSchema");
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
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

        res.render('admin/admin-error', details);
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
                    title: "Baked Goods | Error 404",
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: "404: Page not Found."
                };
                res.render('admin/admin-error', details);
            }
        });
    },

    getAdminAccount : function(req,res){
        const projection = '';
        const query = {};

        database.findOne(admin, query, projection, function(result){
            if(result != null){
                const details ={
                    result,
                    title: "Admin | Account",
                    loggedIn: true,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: null,
                    path
                }

                res.render('admin/admin-profile', details);
            }
        })
    },

    editAdmin : function(req,res){
        const projection = '';
        const query = {_id: req.param.id};

        database.findOne(admin, query, projection, function(result){
            if(result != null){
                const details ={
                    result,
                    title: "Admin | Edit",
                    loggedIn: true,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: null,
                    path
                }

                res.render('admin/admin-edit', details);
            }
        })
    },

    postAdmin : function(req, res){
        const query = {_id: req.param.id};
        var errors = validationResult(req).array()
        var Username = req.body.username;
        var Password = req.body.password;

        if(errors.length > 0) {
            const result= {
                username: Username,
                password: Password,
            };
            console.log(errors);
            const details = {
                result,
                title: "Baked Goods | Register",
                loggedIn: true,
                userId: req.session.userId,
                name: req.session.name,
                error: errors
            }
            res.render('admin/admin-edit', details);
        }
        else{
            database.updateOne(admin, query, {
                username: req.body.username,
                password: req.body.password,
            }, function (result){
                if (result != null) {
                    const details = {
                        result,
                        title: "Baked Goods | " + Username,
                        headertitle: "Successfully Added " + Username,
                        loggedIn: true,
                        userId: req.session.userId,
                        name: req.session.name,
                        line1: "Admin has been successfully Up!",
                        line2: "You can view your credentials in Account",
                        link: "/admin/admin-profile"
                    };
                    res.render('admin/admin-success', details);
                }
                else{
                    const details = {
                        result,
                        title: "Baked Goods | Error 404",
                        loggedIn: true,
                        userId: req.session.userId,
                        name: req.session.name,
                        error: "Oops! Something went wrong in updating your credentials."
                    };
                    res.render('admin/admin-error', details);
                }
            });
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