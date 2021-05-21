const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema ({
    productId : {
        type : Number,
        required: false
    },
    productName : {
        type: String,
        required: false
    },
    productImage : {
        type : String,
        required : false
    }
})

const UserSchema = new mongoose.Schema({
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