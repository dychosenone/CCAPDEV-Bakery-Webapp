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
        var errors = validationResult(req);

        if(!errors.isEmpty()) {
            const details = {
                title: "Baked Goods | Register",
                loggedIn : false,
                error: errors.errors
            }
            res.render('client/register', details);
        }
        else {
            res.redirect('/');
        }
    }
};

module.exports = registerController;
