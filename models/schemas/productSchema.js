const mongoose = require('mongoose');

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890', 10);

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

    productId : {
        type: Number,
        required: nanoid()
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

    reviews : [reviewSchema],

    image: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('product', ProductSchema, 'products');