const database = require("../../models/db");
const user = require("../../models/schemas/adminUserSchema");
const bycrypt = require('bcrypt');

var userController = {
    getLogin : function (req, res) {
        console.log(req.session.adminId);
        if(req.session.adminId) {
            res.redirect('/admin');
        } else {
            res.render('admin/adminlogin', {title: "Baked Goods | Login", loggedIn: false, error: null});
        }
    },

    postLogin : function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        const projection = '';
        const query = {username : username};

        console.log(username);

        database.findOne(user, query, projection, function(result) {
            if(result == null) {
                res.send({status: "error", body: "User not found."});
            } else {
                bycrypt.compare(password, result.password, function(err, equal) {
                    if(equal) {
                        req.session.adminId = result._id;
                        req.session.adminUsername = result.username;
                        res.send({status : "success", redirect : "/admin"});
                    }
                    else {
                        res.send({status: "error", body: "The Username or Password is Incorrect."});
                    }
                });
            }
        });
    }
};

module.exports = userController;