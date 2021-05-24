const database = require("../../models/db");
const user = require("../../models/schemas/userSchema");
const bycrypt = require('bcrypt');

var userController = {
    getLogin : function (req, res) {
        if(req.session.userId) {
            res.redirect('/');
        } else {
            res.render('client/login', {title: "Baked Goods | Login", loggedIn: false, error: null});
        }
    },

    postLogin : function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        const projection = '';
        const query = {username: username};
        console.log(password);

        if(username == '' || password == '') {
            res.send({status: "error", body: "Please fill all the blanks."});
        }
        else {
            database.findOne(user, query, projection, function(result) {
                if(result == null) {
                    res.send({status: "error", body: "User not found."});
                } else {
                    bycrypt.compare(password, result.password, function(err, equal) {
                        if(equal) {
                            req.session.userId = result._id;
                            req.session.name = result.fullName;
                            req.session.cartCount = 0;
                            req.session.cart = [];
                            req.session.newOrder = false;
                            res.send({status: 'success', redirect : '/'});
                        }
                        else {
                            res.send({status: "error", body: "The Username or Password is Incorrect."});
                        }
                    });
                }
            }); 
        }

    }
};

module.exports = userController;