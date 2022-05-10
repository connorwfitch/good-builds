// external modules
const express = require('express');
const { check, validationResult } = require('express-validator');

// internal modules
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require('../auth');

// creating router
const router = express.Router();


/* GET sign up page. */
router.get('/', (req, res) => {
    const user = db.User.build();
    res.render('sign-up-form');
});

/* POST sign up page. */
router.post('/signup', asyncHandler(async(req, res) => {
    // 
}));

module.exports = router;