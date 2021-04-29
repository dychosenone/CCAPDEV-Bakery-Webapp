const user = require('../../models/schemas/userSchema');
const database = require('../../models/db');

var accountController = {
    
    getAccount : function (req, res) {

        var loggedIn = false;
        if(req.session.userId) loggedIn = true;

        if(loggedIn == false) {
            res.redirect('/');
        } else {
            const query = {userId : req.session.userId};
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

            const query = {userId : req.session.userId};
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

        var loggedIn = false;
        if(req.session.userId) loggedIn = true;
        
        const filter = {userId: req.session.userId};
        const update = { $set:
            {
                fullName : editInput.newName,
                email: editInput.newEmail,
                contact: editInput.newContact,
                alternativeContact: editInput.newAlternativeContact,
                billingAddress: editInput.newBilling,
                deliveryAddress: editInput.newDelivery,
            }
        }
        database.updateOne(user, filter, update, function(flag) {

            if(flag) {
                projection = '';
                query = {}
                database.findOne(user, query, projection, function(result) {
                    if(result != null) {
                        req.session.name = result.fullName;
                        const details = {
                            result,
                            title: "Baked Goods | Error",
                            loggedIn: loggedIn,
                            userId: req.session.userId,
                            name: req.session.name,
                            error: 'success',
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


            } else {

                projection = '';
                query = {}
                database.findOne(user, query, projection, function(result) {
                    if(result != null) {
                        const details = {
                            result,
                            title: "Baked Goods | Error",
                            loggedIn: loggedIn,
                            userId: req.session.userId,
                            name: req.session.name,
                            error: "Failed to update data.",
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
        });  

    }

};

module.exports = accountController;