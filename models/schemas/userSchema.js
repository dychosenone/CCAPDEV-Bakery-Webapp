const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema ({
    productId : {
        type : Number,
        required: true
    },
    productName : {
        type: String,
        required: true
    },
    productImage : {
        type : String,
        required : true
    }
})

const UserSchema = new mongoose.Schema({
    userID : {
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
    contact : {
        type: Number,
        required: true
    },
    alternativeContact : {
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
    },
    favorites : [favoritesSchema]
    
});

module.exports = mongoose.model('user', UserSchema, 'users');