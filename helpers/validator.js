const {check, oneOf} = require('express-validator');

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
            check('username', 'The username field should not be left blank.').notEmpty(),
            check('deliveryAddress', 'The delivery address must not be left blank').notEmpty(),
            oneOf([check('sameAddress', 'The billing address must not be left blank.').equals('true'),
            check('billingAddress').notEmpty()], ['The billing address must not be left blank.'])
        ];

        return validation;
    }

};

module.exports = validator;