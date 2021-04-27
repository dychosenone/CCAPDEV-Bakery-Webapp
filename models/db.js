const mongoose = require('mongoose');
const product = require('./schemas/productSchema');

const url = 'mongodb://localhost:27017/baked_goods';

const config = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

// Database Object
const database = {

    // Database Connect
    connect : function () {
        mongoose.connect(url, config, function (error) {
            if(error == true) {
                throw error;
            }
            console.log(`Connected to ${url}`);
        });
    },

    findOne : function (model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
           if(error == true) {
               return callback(false);
           }
           return callback(result);
        });
    },

    findMany : function (model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error == true) {
                return callback(false);
            }
            return callback(result);
        });
    }
};
module.exports = database;