const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    productId : {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description : {
        type: String,
        required: true
    },

    sizes : [{
        size : {
            type: String,
            required: true
        },
        price : {
            type: Number,
            required: true
        }
    }],

    reviews : [{
        userId : {
            type: Number,
            required: true
        },
        review : {
            type: String,
            required: true
        }
    }],

    image: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('product', ProductSchema, 'products');