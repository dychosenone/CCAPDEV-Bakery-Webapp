const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    fullName : {
        type: String,
        required: true
    },
    review : {
        type: String,
        required: true
    }
})

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
            type: Number,
            required: true
        },
        price : {
            type: Number,
            required: true
        }
    }],

    reviews : [reviewSchema],

    image: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('product', ProductSchema, 'products');