// external modules
const express = require('express');
const { check, validationResult } = require('express-validator');

// internal modules
const { csrfProtection, asyncHandler, bcrypt } = require('./utils');
const { loginUser } = require('../auth');
const db = require("../db/models");

// creating router
const router = express.Router();

/*
--------------VALIDATORS--------------
*/
// TODO: add log in validations

const loginValidators = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Email Address'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')
];

/*
--------------ROUTES--------------
*/

// GET login page.
router.get('/', csrfProtection, (req, res) => {
    const user = db.User.build();
    res.render('login', {
        title: 'Login',
        csrfToken: req.csrfToken(),
    });
});

// POST login page
router.post('/', csrfProtection, loginValidators, asyncHandler(async(req, res) => {
    const {
        email,
        password
    } = req.body;

    const validatorErrors = validationResult(req);

    let errors = [];

    if (validatorErrors.isEmpty()) {
        const user = await db.User.findOne({
            where: { email }
        });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
            if (passwordMatch) {
                loginUser(req, res, user);
                return res.redirect('/');
            }
        }
        errors.push('Login failed for the provided email address and password');

    } else {
        errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render('login', {
        title: 'Log In',
        email,
        errors,
        csrfToken: req.csrfToken(),
    });
}));

module.exports = router;