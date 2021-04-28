const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    emailAddress : {
        type: String,
        required: true
    },
    contact : {
        type: Number,
        required: true
    },
    billingAddress : {
        type: String,
        required: true
    },
    deliveryAddress : {
        type: String,
        required: true
    },
    fullName : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user', UserSchema, 'users');