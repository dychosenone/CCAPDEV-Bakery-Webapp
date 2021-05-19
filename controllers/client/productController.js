const database = require("../../models/db");
const product = require("../../models/schemas/productSchema");
const path = require('path');

var productController = {

    getProducts : function(req, res) {
        const projection = 'name description image productId';
        database.findMany(product, {}, projection, function(result) {
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
                console.log(result);
                res.render('client/products', details);
            }
        });
    },

    getProduct : function(req, res) {
        const projection = '';
        const query = {productId: req.params.productId};

        var errors = [];
        var success = [];

        if(req.query.success) {
            success.push('You have successfully deleted a review.');
        }

        if(req.query.error) {
            errors.push({msg: 'You can only add one review.'});
        }
        database.findOne(product, query, projection, function(result) {
            var loggedIn = false;

            if(req.session.userId) loggedIn = true;
            else loggedIn = false;

            if(result != null) {
                console.log(errors.length);
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
        });
    },

    postReview: function(req, res) {

        var query = {reviews: {$elemMatch : {userId: req.session.userId}}};

        database.findOne(product, query, '', function(result){
            if(result != null)
                res.redirect('/products/' + req.params.productId + '?error=reviewError');
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
                        res.redirect('/products/' + req.params.productId);
                    }
                });
            }
        });
    },

    deleteReview: function(req, res) {
        var filter = {productId : req.params.productId};
        var query = {$pull : {reviews : {userId: req.session.userId}}};

        database.updateOne(product, filter, query, function(flag){
            if(flag) {
                res.redirect('/products/' + req.params.productId + '?success=ok');
            }
        });

    }
}

module.exports = productController;