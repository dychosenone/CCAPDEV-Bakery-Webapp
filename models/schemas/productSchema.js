const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: false
    },
    fullName : {
        type: String,
        required: false
    },
    review : {
        type: String,
        required: false
    }
})

const ProductSchema = new mongoose.Schema({

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
        required: false
    }

});

module.exports = mongoose.model('product', ProductSchema, 'products');