const user = require('../../models/schemas/userSchema');
const database = require('../../models/db');
const {validationResult} = require('express-validator');


var accountController = {
    
    getAccount : function (req, res) {

        var loggedIn = false;
        if(req.session.userId) loggedIn = true;

        if(loggedIn == false) {
            res.redirect('/');
        } else {
            const query = {_id : req.session.userId};
            const projection = '';

            database.findOne(user, query, projection, function(result) {

                if(result != null) {
                    const details = {
                        result,
                        title: "Baked Goods | " + result.fullName,
                        loggedIn: loggedIn,
                        userId: req.session.userId,
                        name: req.session.name,
                        error: null,
                        page: 'account'
                    };
                    res.render('client/account', details);

                } else {
                    const details = {
                        result,
                        title: "Baked Goods | Error",
                        loggedIn: loggedIn,
                        userId: req.session.userId,
                        name: req.session.name,
                        error: "User not Found",
                        page: 'account'
                    };
                    res.render('client/error', details);
                }
            });

        }
    },

    getEditAccount : function(req, res) {
        var loggedIn = false;
        if(req.session.userId) loggedIn = true;

        if(loggedIn == false) {
            res.redirect('/');
        } else {

            const query = {_id : req.session.userId};
            const projection = '';

            database.findOne(user, query, projection, function(result) {

                if(result != null) {
                    const details = {
                        result,
                        title: "Baked Goods | " + result.fullName,
                        loggedIn: loggedIn,
                        userId: req.session.userId,
                        name: req.session.name,
                        error: null,
                        page: 'editAccount'
                    };
                    res.render('client/editaccount', details);

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
                    res.render('client/error', details);
                }
            });
        }
    },

    postEditAccount : function(req, res) {
        var editInput = req.body;
        var errors = validationResult(req).array();

        if(errors.length > 0) {
            res.send({status: 'error', errors : errors});
        } else {
            var loggedIn = false;
            if(req.session.userId) loggedIn = true;
            
            const filter = {_id: req.session.userId};
            const update = { $set:
                {
                    fullName : editInput.fullName,
                    email: editInput.email,
                    contact: editInput.contactNumber,
                    alternativeContact: editInput.alternativeContactNumber,
                    billingAddress: editInput.billingAddress,
                    deliveryAddress: editInput.deliveryAddress,
                }
            }

            console.log(update);
            database.updateOne(user, filter, update, function(flag) {
    
                if(flag) {
                    projection = '';
                    query = {}
                    database.findOne(user, query, projection, function(result) {
                        console.log(errors);
                        if(result != null) {
                            req.session.name = result.fullName;
                            res.send({status : 'success', message : 'Successfully updated user.'});
                        } else {
                            res.send({status : 'error', message : 'User not found.'});
                        }
    
                    });
                } else {
    
                    projection = '';
                    query = {}
                    database.findOne(user, query, projection, function(result) {
                        if(result != null) {
                            res.send({status : 'error', message : 'Failed to updated data.'});
                        } else {
                            res.send({status : 'error', message : 'User not found.'});
                        }
                    });
                }
            });  
    
        }

        
    }

};

module.exports = accountController;