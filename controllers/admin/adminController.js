const database = require("../../models/db");
const admin = require("../../models/schemas/adminUserSchema");
const orders = require("../../models/schemas/transactionSchema");
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const path = require('path');
const e = require("express");
const transactionSchema = require("../../models/schemas/transactionSchema");

var adminController = {

    error: function(req, res) {
        var loggedIn = false;
        
        if(req.session.adminId) loggedIn = true;
        else false;

        const details = {
            title: "Baked Goods | Error 404",
            loggedIn: loggedIn,
            userId: req.session.adminId,
            username: req.session.adminUsername,
            error: "404: Page not Found."
        };

        res.render('admin/admin-error', details);
    },

    getIndex : function (req, res) {
        const projection = '';
        const query = {};

        var loggedIn = false;

        if(req.session.adminId) loggedIn = true;
        else loggedIn = false;

        if(loggedIn == false) {
            res.redirect('/admin/adminLogin');
        } else {
          
            database.findMany(orders, query, projection, function(result) {

                if(result != null) {
                    const details = {
                        result,
                        title: "Admin | Active Orders",
                        loggedIn: loggedIn,
                        userId: req.session.adminId,
                        username: req.session.adminUsername,
                        error: null,
                        path
                    };
                    res.render('admin/index', details);
                }
                else {
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
                    userId: req.session.adminId,
                    username: req.session.adminUsername,
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
                    userId: req.session.adminId,
                    username: req.session.username,
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
                userId: req.session.adminId,
                username: req.session.adminUsername,
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
                        userId: req.session.adminId,
                        username: req.session.adminUsername,
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
                        userId: req.session.adminId,
                        username: req.session.adminUsername,
                        error: "Oops! Something went wrong in updating your credentials."
                    };
                    res.render('admin/admin-error', details);
                }
            });
        }


    },

    getOrderDetails : function(req, res) {
        const projection = '';
        const query = {orderId : req.params.orderId};

        var loggedIn = false;

        if(req.session.adminId) loggedIn = true;
        else loggedIn = false;

        if(loggedIn == false) {
            res.redirect('/admin/adminLogin');
        } else {
          
            database.findOne(orders, query, projection, function(result) {

                if(result != null) {
                    const details = {
                        result,
                        title: "Admin | Order Detail",
                        loggedIn: loggedIn,
                        userId: req.session.adminId,
                        username: req.session.adminUsername,
                        error: null,
                        path
                    };
                    res.render('admin/orderdetails', details);
                }
                else {
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

    },

    getStatus : function(req, res) {
        var status = req.query.status;
        var query = {status : status};
        var filter = {orderId : req.query.orderId};

        console.log(status);

        database.updateOne(orders, filter, query, function(flag) {
            if(flag) {
                res.send({status : 'success', message : 'Status updated successfully.'});
            } else {
                res.send({status : 'error', message : 'Error updating status.'});
            }
        });
    },
 
    getLogout : function(req, res) {
        if(req.session.adminId) {
            delete req.session.adminId;
            delete req.session.adminUsername;
            res.redirect('/admin/adminlogin')
        } else {
            res.redirect('/');
        }
    }

}

module.exports = adminController;