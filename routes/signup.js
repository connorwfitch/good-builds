// external modules
const express = require('express');
const { check, validationResult } = require('express-validator');

// internal modules
const { csrfProtection, asyncHandler, bcrypt } = require('./utils');
const { loginUser, logoutUser } = require('../auth');

// creating router
const router = express.Router();

/*
--------------VALIDATORS--------------
*/
// TODO: add sign up validations

const userValidators = [];

/*
--------------ROUTES--------------
*/

// GET sign up page.
router.get('/', csrfProtection, (req, res) => {
    const user = db.User.build();
    res.render('sign-up', {
        user,
        csrfToken: req.csrfToken(),
    });
});

/* POST sign up page. */
router.post('/signup', csrfProtection, userValidators, asyncHandler(async(req, res) => {
    const {
        firstName,
        lastName,
        emailAddress,
        password
    } = req.body;

    const user = db.User.build({
        firstName,
        lastName,
        emailAddress
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        const hashedPassword = await bcrypt.hash(password, 12)
        user.hashedPassword = hashedPassword;
        await user.save();
        loginUser(req, res, user);
        // TODO: decide where we want to redirect users after successful login
        res.redirect('/');
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('sign-up', {
            user,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}));

module.exports = router;