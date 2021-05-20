const database = require("../../models/db");
const product = require("../../models/schemas/productSchema");
const user = require("../../models/schemas/userSchema");

const path = require('path');

var favoritesController = {
    
    getFavorites : function(req, res) {

        var loggedIn = false;

        if(req.session.userId) loggedIn = true;
        else loggedIn = false


        var query = {_id : req.session.userId};
        var projection = 'favorites';

        database.findOne(user, query, projection, function(result) {
            console.log(result.favorites);
            if(result != null) {
                details = {
                    result : result.favorites,
                    page: 'Favorites',
                    title: "Baked Goods | Favorites",
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: null,
                    path
                }
                res.render('client/favorites', details);
            }

        });

    },
    getAddFavorites : function(req, res) {
        var filter = {_id: req.query.userId};
        var productId = req.query.productId;
        console.log(productId);

        var searchQuery = {productId : productId};
        var projection = 'name image';
        
        database.findOne(product, searchQuery, projection, function(result) {
            console.log(result);
            var favorites = {
                productId : productId,
                productName : result.name,
                productImage : result.image
            };
            var query = {$push : { 'favorites' : favorites } };
            
            database.updateOne(user, filter, query, function(flag){
                if(flag) {
                    res.send({status: 'success', message: 'Successfully added a new favorite item.'});
                }
                else {
                    res.send({status: 'error', message: 'Error adding a new favorite item.'});
                }
            });  
        });  
    },

    getRemoveFavorites : function(req, res) {
        //TODO
        var filter = {_id : req.query.userId};
        var query = {$pull : {favorites : {productId: req.query.productId}}};

        database.updateOne(user, filter, query, function(flag){
            if(flag) {
                res.send({status: 'success', message: "Successfully removed from favorites."});
            }
        });
    }

};

module.exports = favoritesController;