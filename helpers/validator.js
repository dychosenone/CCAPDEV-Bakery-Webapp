const {check, oneOf} = require('express-validator');
const database = require('../models/db');
const user = require('../models/schemas/userSchema')

const validator = {

    registerValidator : function() {
        
        var validation = [
            check('fullName', 'Your Full name should not be empty.').notEmpty(),
            check('email', 'Your email should not be empty.').notEmpty().isEmail().withMessage('Should be a valid email address.').normalizeEmail(),
            check('password', 'Your password should not be empty.').notEmpty().isLength({min : 8}).withMessage('Password should be at least 8 characters'),
            check('confirmPassword')
            .custom(function(value, {req}) {
                if(value !== req.body.password) {
                    return false;
                }
                return true;
            }).withMessage('Password does not match.'),
            check('username', 'Your username should not be empty.').notEmpty(),
            check('deliveryAddress', 'The delivery address must not be left blank').notEmpty(),
            oneOf([check('sameAddress', 'The billing address must not be left blank.').equals('true'),
            check('billingAddress').notEmpty()], ['The billing address must not be left blank.'])
        ];

        return validation;
    },

    editAccountValidator : function () {

        var validation = [
            check('fullName', 'Your Full name should not be empty.').notEmpty(),
            check('email', 'Your email should not be empty.').notEmpty().isEmail().withMessage('Should be a valid email address.').normalizeEmail(),
            check('deliveryAddress', 'The delivery address must not be left blank').notEmpty(),
            check('billingAddress', 'The billing address must not be left blank').notEmpty(),
            check('contactNumber', 'The contact number must be valid and not empty.').notEmpty().isNumeric().isLength(12),
            check('alternativeContactNumber', 'The alternative number must be valid.').isNumeric().isLength(12)

        ]

        return validation;
    },

    addUserValidator : function() {

        var validation = [
            check('Username', 'Your username should not be empty.').notEmpty(),
            check('fullName', 'Your Full name should not be empty.').notEmpty(),
            check('email').isEmail().withMessage('Should be a valid email address.').normalizeEmail(),
            check('Password').isLength({min : 8}).withMessage('Password should be at least 8 characters'),
            check('deliveryAddress', 'The delivery address must not be left blank').notEmpty(),
            check('billingAddress', 'The billing address must not be left blank').notEmpty(),
            check('contact', 'The contact number must not be left blank and must be valid.').notEmpty().isNumeric(12),
            check('alternativeContact', 'The alternative contact number must be valid.').isNumeric()

        ];

        return validation;
    },

    editUserValidator : function() {

        var validation = [
            check('email').isEmail().withMessage('Should be a valid email address.').normalizeEmail(),
        ];

        return validation;
    },

    adminValidator : function() {

        var validation = [
            check('password').isLength({min : 8}).withMessage('Password should be at least 8 characters'),
        ];

        return validation;
    },

};

module.exports = validator;