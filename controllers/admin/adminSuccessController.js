const database = require("../../models/db");
const users = require("../../models/schemas/userSchema");

const path = require('path');

var adminAccountController = {

    getSuccess: function(req, res){
        var loggedIn = false;

        if(req.session.adminId) loggedIn = true;
        else loggedIn = false;

        if(loggedIn){
            const details = {
                title: "Admin | Success",
                loggedIn: loggedIn,
                userId: req.session.adminId,
                username: req.session.adminUsername,
                error: null,
                path
            };
            res.render('admin/admin-success', details)
        }
        else
        {
            res.redirect('/admin/adminLogin');
        }
    }
}

module.exports = adminAccountController;