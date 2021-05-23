const mongoose = require('mongoose');
const database = require('../db');

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);

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

    orderId : {
        type: String,
        default : () => nanoid()
    },

    date : {
        type: Date, 
        default: Date.now
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

    subtotal: {
        type: Number,
        required: true
    },

    deliveryFee: {
        type: Number,
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

module.exports = mongoose.model('transaction', TransactionSchema, 'transactions');