const database = require("../../models/db");
const users = require("../../models/schemas/userSchema");

const path = require('path');

var adminAccountController = {

    getSuccess: function(req, res){
        var loggedIn = false;

        if(req.session.userId) loggedIn = true;
        else loggedIn = false;

        const details = {
            title: "Admin | Success",
            loggedIn: loggedIn,
            userId: req.session.userId,
            name: req.session.name,
            error: null,
            path
        };
        res.render('admin/admin-success', details)
    }
}

module.exports = adminAccountController;