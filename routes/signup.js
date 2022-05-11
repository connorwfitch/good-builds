// external modules
const express = require('express');
const { check, validationResult } = require('express-validator');

// internal modules
const db = require('../db/models');
const { csrfProtection, asyncHandler, bcrypt } = require('./utils');
const { loginUser } = require('../auth');

// creating router
const router = express.Router();

/*
--------------VALIDATORS--------------
*/
// TODO: add sign up validations

const userValidators = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for First Name')
        .isLength({ max: 50 })
        .withMessage('First Name must not be more than 50 characters long'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Last Name')
        .isLength({ max: 50 })
        .withMessage('Last Name must not be more than 50 characters long'),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Email Address')
        .isEmail()
        .withMessage('Please provide a valid Email Address')
        .isLength({ max: 255 })
        .withMessage('Email Address must not be more than 255 characters long')
        .custom((value) => {
            return db.User.findOne({ where: { email: value } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('The provided Email Address is already in use by another account');
                    }
                });
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
                throw new Error('Confirm Password does not match Password');
            }
            return true;
        })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least one lowercase letter, uppercase letter, number, and special character (i.e. !@#$%^&*)')
];

/*
--------------ROUTES--------------
*/

// GET sign up page.
router.get('/', csrfProtection, (req, res) => {
    const user = db.User.build();
    res.render('sign-up', {
        title: 'Sign Up',
        user,
        csrfToken: req.csrfToken(),
    });
});

// POST sign up page
router.post('/', csrfProtection, userValidators, asyncHandler(async(req, res) => {
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;

    const user = db.User.build({
        firstName,
        lastName,
        email
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        const hashedPassword = await bcrypt.hash(password, 12)
        user.hashedPassword = hashedPassword;
        await user.save();
        loginUser(req, res, user);
        // TODO: decide where we want to redirect users after successful login
        req.session.save(() => res.redirect('/'))
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('sign-up', {
            title: 'Sign Up',
            user,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}));

module.exports = router;