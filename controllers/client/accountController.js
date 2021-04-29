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
                        error: null
                    };
                    res.render('client/account', details);
                    
                } else {
                    const details = {
                        result,
                        title: "Baked Goods | Error",
                        loggedIn: loggedIn,
                        userId: req.session.userId,
                        name: req.session.name,
                        error: "User not Found"
                    };
                    res.render('client/error', details);
                }
            });

        }
    }

};

module.exports = accountController;