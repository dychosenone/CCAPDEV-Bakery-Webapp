const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema({
    userId : {
        type: Number,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    fullName : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user', AdminUserSchema, 'users');