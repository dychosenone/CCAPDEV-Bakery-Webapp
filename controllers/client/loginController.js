const database = require("../../models/db");
const user = require("../../models/schemas/userSchema");


var userController = {
    getLogin : function (req, res) {
        res.render('client/login', {title: "Baked Goods | Login"});
    }
};

module.exports = userController;