const mongoose = require('mongoose');
const database = require('../db');

const itemSchema = new mongoose.Schema({
    productId : {
        type: String,
        required: true
    },
    productName : {
        type: String,
        required: true
    },
    quantity : {
        type: Number,
        required: true
    },
    price : {
        type: Number,
        required: true
    }
})

const TransactionSchema = new mongoose.Schema({

    date : {
        type: Number,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    name : {
        type: String,
        required: true
    },

    status : {
        type: String,
        required: true
    },

    deliveryAddress : {
        type: String,
        required: true
    },

    billingAddress : {
        type: String,
        required: true
    },

    contactNumber : {
        type: String,
        required: true
    },

    
    alternativeContactNumber : {
        type: String,
        required: true
    },

    orders : [itemSchema]

});

module.exports = mongoose.model('transaction', TransactionSchema, 'products');