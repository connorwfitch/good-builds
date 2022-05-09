const express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const router = express.Router();


/* GET sign up page. */
router.get('/signup', (req, res) => {
    //   
});

/* POST sign up page. */
router.post('/signup', asyncHandler(async(req, res) => {
    // 
}));

module.exports = router;