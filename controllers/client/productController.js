const database = require("../../models/db");
const product = require("../../models/schemas/productSchema");
const user = require("../../models/schemas/userSchema");
const path = require('path');

var productController = {

    getProducts : function(req, res) {
        const projection = 'name description image productId';
        
        if(req.query.search) {
            query = {name : { $regex: req.query.search, $options: "i"}};
        } else {
            query = {};
        }

        console.log(query);

        database.findMany(product, query, projection, function(result) {
            var loggedIn = false;

            if(req.session.userId) loggedIn = true;
            else loggedIn = false;


            if(result != null) {
                const details = {
                    result,
                    title: "Baked Goods | Products",
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: null,
                    path
                };
                console.log(result);
                res.render('client/products', details);
            }
            else {
                const details = {
                    result,
                    title: "Baked Goods | No Products Found",
                    loggedIn: loggedIn,
                    userId: req.session.userId,
                    name: req.session.name,
                    error: "No Products Found.",
                    path
                };
                res.render('client/products', details);
            }
        });
    },

    getProduct : function(req, res) {
        const projection = '';
        const query = {productId: req.params.productId};
        var productId = req.params.productId;

        var errors = [];

        database.findOne(product, query, projection, function(result) {

            var userQuery = {_id : req.session.userId};
            var userProjection = 'favorites'
            
            var loggedIn = false;

            if(req.session.userId) loggedIn = true;
            else loggedIn = false;


            if(loggedIn == true) {
                database.findOne(user, userQuery, userProjection, function(findResult) {
                    if(findResult.favorites.length != null) {
                        var favoritesIndex = findResult.favorites.findIndex(x => x.productId == productId);
                        var isFavorite;
                        if(favoritesIndex > -1) {
                            isFavorite = true;
                        } else {
                            isFavorite = false;
                        }
    
                        console.log(result);
    
    
                        if(result != null) {
                            const details = {
                                isFavorite,
                                result,
                                title: "Baked Goods | " + result.name,
                                loggedIn: loggedIn,
                                userId: req.session.userId,
                                name: req.session.name,
                                error: errors,
                                path
                            };
    
                            res.render('client/product', details);
                        } else {
                            const details = {
                                isFavorite,
                                result,
                                title: "Baked Goods | Error 404",
                                loggedIn: loggedIn,
                                userId: req.session.userId,
                                name: req.session.name,
                                error: "404: Page not Found.",
                                path
                            };
                            res.render('client/error', details);
                        }
                    }
                });
            } else {
                
                if(result != null) {
                    const details = {
                        result,
                        title: "Baked Goods | " + result.name,
                        loggedIn: loggedIn,
                        userId: req.session.userId,
                        name: req.session.name,
                        error: errors,
                        path
                    };

                    res.render('client/product', details);
                } else {
                    const details = {
                        result,
                        title: "Baked Goods | Error 404",
                        loggedIn: loggedIn,
                        userId: req.session.userId,
                        name: req.session.name,
                        error: "404: Page not Found.",
                        path
                    };
                    res.render('client/error', details);
                }
            }
            
        });
            
    },

    postReview: function(req, res) {

        var query = {reviews: {$elemMatch : {userId: req.session.userId}}};

        database.findOne(product, query, '', function(result){
            if(result != null)
                res.send({status: 'error', message: 'Error: You can only add one review.'});
            else {
                
                var filter = {productId : req.params.productId}
                var review = {
                    userId : req.session.userId,
                    fullName: req.session.name,
                    review: req.body.review
                }
                console.log(review);
                var query = {$push : { 'reviews' : review } };

                database.updateOne(product, filter, query, function(flag){
                    if(flag) {
                        res.send({status: 'success', message: 'Successfully posted a review.'});
                    }
                });
            }
        });
    },

    editReview: function(req, res) {

        var query = {reviews: {$elemMatch : {userId: req.session.userId}}};
        console.log(req.body.review);
        database.findOne(product, query, '', function(result){
            if(result != null){
                var filter = {productId : req.params.productId}

                var success = false;
                for (let i = 0; i < result.reviews.length; i++) {
                    if(result.reviews[i].userId === req.session.userId){
                        result.reviews[i].review=req.body.review;

                        database.updateOne(product, filter, {reviews: result.reviews}, function(flag){
                            if(flag) {
                                res.send({status: 'success', message: 'Successfully updated a review.', review: req.body.review});
                            }
                        });
                        success= true;
                    }
                }
                if(success === false){
                    res.send({status: 'error', message: 'Error: Did not find review in database'});
                }
            }
            else {
                res.send({status: 'error', message: 'Error: Did not find review in database'});
            }
        });
    },

    deleteReview: function(req, res) {
        var filter = {productId : req.params.productId};
        var query = {$pull : {reviews : {userId: req.session.userId}}};

        database.updateOne(product, filter, query, function(flag){
            if(flag) {
                res.send({status: 'success', message: "Successfully deleted the review."});
            }
        });

    },
    
    getAddToCart : function(req, res) {
        
        var productId = req.query.productId
        var option = req.query.option;

        var query = {productId : productId};
        var projection = ''
        
        database.findOne(product, query, projection, function(result) {

            var quantity = result.sizes[option].size;
            var price = result.sizes[option].price;

            var newItem = {
                productId: result.productId,
                productName:result.name,
                quantity: quantity,
                price : price
            }

            var productIndex = req.session.cart.findIndex(x => x.productId == productId);

            if(productIndex != -1) {
                req.session.cart[productIndex].price += price;
                req.session.cart[productIndex].quantity += quantity;
            } else {
                req.session.cart.push(newItem);

            }
            req.session.save();
            res.send(result);
        });

        
    }
}

module.exports = productController;