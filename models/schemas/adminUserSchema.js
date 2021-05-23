const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('adminUser', AdminUserSchema, 'adminUsers');