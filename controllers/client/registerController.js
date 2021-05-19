const bcrypt = require('bcrypt');

const database = require('../../models/db');
const user = require('../../models/schemas/userSchema');

const {validationResult} = require('express-validator');

var registerController = {

    getRegister : function(req, res) {
        if(req.session.userId) {
            res.redirect('/');
        }
        else {
            const details = {
                title: "Baked Goods | Register",
                loggedIn : false,
                error: null
            }
            res.render('client/register', details);
        }
    },

    postRegister : function (req, res) {
        var errors = validationResult(req).array();
        var query = {username : req.body.username};
        var projection = '';

        var checker = new Promise(function(resolve, reject) {
            
            database.findOne(user, query, projection, function(result) {
                if(result != null) {
                    resolve({    
                        value: req.body.username,
                        msg: 'The username is already in use.',
                        param: 'username',
                        location: 'body'
                    })
                }
                reject();
            });
        });
        checker.then((message) => {
            if(message != false) {
                errors.unshift(message);
            }

            if(errors) {
                console.log(errors);
                const details = {
                    title: "Baked Goods | Register",
                    loggedIn : false,
                    error: errors
                }
                res.render('client/register', details);
            }
        }).catch((message) => {
            if(errors.length > 0) {
                console.log(errors);
                const details = {
                    title: "Baked Goods | Register",
                    loggedIn : false,
                    error: errors
                }
                res.render('client/register', details);
            }
            else {
                bcrypt.hash(req.body.password, 12, function(err, hash) {
                    var billingAddress = req.body.billingAddress;
                    
                    if(req.body.sameAddress == 'true') {
                        billingAddress = req.body.deliveryAddress;
                    }

                    var userData = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        contact: 63,
                        alternativeContact: 63,
                        fullName: req.body.fullName,
                        deliveryAddress: req.body.deliveryAddress,
                        billingAddress: billingAddress,
                    }
                    console.log(userData);
                    database.addOne(user, userData, function(flag) {
                        res.redirect('/registerSuccess?username='+req.body.username);
                        
                    });

                });
                
            }
        });
    },

    getRegisterSuccess : function(req, res) {
        
        if(req.query.username) {
            var username = req.query.username;

            const details = {
                loggedIn: false,
                title: "Baked Goods | Success",
                username: username
            };

            res.render('client/success', details);
        }
        else {
            res.redirect('/');
        }   
    }
};

module.exports = registerController;
