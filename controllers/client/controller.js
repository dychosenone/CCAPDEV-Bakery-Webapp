const database = require("../../models/db");
const user = require("../../models/schemas/userSchema");

var controller = {

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

        res.render('client/error', details);
    },

    getIndex : function (req, res) {
        if(req.session.userId) {
            res.render('client/index', {title: 'Baked Goods', loggedIn: true, name: req.session.name});
        } else {
            res.render('client/index', {title: 'Baked Goods', loggedIn: false});
        }
    },

    getAbout : function (req, res) {
        if(req.session.userId) {
            res.render('client/index', {title: 'Baked Goods', loggedIn: true, name: req.session.name});
        } else {
            res.render('client/about', {title: 'Baked Goods | About', loggedIn: false});
        }
    },

    getLogout : function(req, res) {
        req.session.destroy(function(error) {
            if(error == true) {
                throw error;
            }
            res.redirect('/');
        })
    }

}

module.exports = controller;