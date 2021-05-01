const database = require('../../models/db');
const user = require('../../models/schemas/userSchema');

const {validationResult} = require('express-validator');

registerController = {

    getRegister : function(req, res) {
        
        if(req.session.userId) {
            res.redirect('/');
        }
        else {
            var errors = validationResult(req);

            const details = {
                title: "Baked Goods | Register",
                loggedIn : false,
                error: errors.errors
            }
            res.render('client/register', details);
        }
    },

    postRegister : function (req, res) {

    }
};

module.exports = registerController;
