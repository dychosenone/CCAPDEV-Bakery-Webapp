const mongoose = require('mongoose');
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
    },

    addOne : function (model, doc, callback) {
        model.create(doc, function(error, result) {
            if(error == true) {
                return callback(false);
            } else {
                return callback(true);
            }
        })
    },

    addMany : function (model, doc, callback) {
        model.insertMany(doc, function(error, result) {
            if(error == true) {
                return callback(false);
            } else {
                console.log('Added the following: ' + result);
                return callback(true);
            }
        });
    },

    deleteOne : function(model, cond) {
        model.deleteOne(cond, function(error, result) {
            if(error == true) {
                return callback(false);
            } else {
                console.log('Deleted the following: ' + result);
                return callback(true);
            }
        });
    },

    deleteMany : function(model, cond) {
        model.deleteMany(cond, function(error, result) {
            if(error == true) {
                return callback(false);
            } else {
                console.log('Deleted the following: ' + result);
                return callback(true);
            }
        });
    },

    updateOne : function(model, filter, update) {
        model.deleteMany(filter, update, function(error, result) {
            if(error == true) {
                return callback(false);
            } else {
                console.log('Updated the following: ' + result);
                return callback(true);
            }
        });
    },

    updateMany : function(model, filter, update) {
        model.updateMany(filter, update, function(error, result) {
            if(error == true) {
                return callback(false);
            } else {
                console.log('Updated the following: ' + result);
                return callback(true);
            }
        });
    }
};

module.exports = database;