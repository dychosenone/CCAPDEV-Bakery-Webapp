const {check} = require('express-validator');

validator = {

    registerValidator : function() {
        
        var validation = [
            check('fullName', 'Your Full name should not be empty.').notEmpty(),
            check('email', 'Your email should not be empty.').notEmpty().isEmail().withMessage('Should be a valid email address.').normalizeEmail(),
            check('password', 'Your password should not be empty.').notEmpty().isLength({min : 8}).withMessage('Password should be at least 8 characters'),
            check('confirmPassword', 'Confirm password should not be left blank.').isNotEmpty()
            .custom(function(value, [req]) {
                if(value !== req.body.confirmPassword)
                    throw new error("Password is not equal.")
            }),
            check('username', 'The username field should not be left blank.').isNotEmpty(),
            check('deliveryAddress', 'The delivery address must not be left blank').isNotEmpty(),
            check('sameAddress', 'The billing address must be filled out').not(equals('true')).bail(),
            check('billingAddress', 'The billing address must not be left blank').isNotEmpty()
        ]
        return validation;
    }

};

module.exports = validator;