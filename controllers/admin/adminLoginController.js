const database = require("../../models/db");
const user = require("../../models/schemas/AdminUserSchema");
const bycrypt = require('bcrypt');

var userController = {
    getLogin : function (req, res) {
        if(req.session.userId) {
            res.redirect('/');
        } else {
            res.render('admin/adminlogin', {title: "Baked Goods | Login", loggedIn: false, error: null});
        }
    },

    postLogin : function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        const projection = '';
        const query = {username: username};

        database.findOne(user, query, projection, function(result) {
            if(result == null) {
                res.render('admin/adminlogin', {title: "Baked Goods | Login", error: "User not found.", loggedIn: false});
            } else {
                bycrypt.compare(password, result.password, function(err, equal) {
                    if(equal) {
                        req.session.userId = result.userId;
                        req.session.name = result.fullName;
                        res.redirect('/');
                    }
                    else {
                        res.render('admin/adminlogin', {title: "Baked Goods | Login", error: "The Username or Password is Incorrect.", loggedIn: false});
                    }
                });
            }
        });
    }
};

module.exports = userController;