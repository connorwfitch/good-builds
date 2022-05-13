// external modules
const express = require('express');
const { check } = require('express-validator');

// internal modules
const db = require('../db/models');
const { handleValidationErrors, asyncHandler } = require('./utils');
// const { requireAuth } = require('../auth');

const router = express.Router();

/*
--------------VALIDATORS--------------
*/

const reviewValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Title')
    .isLength({ max: 255 })
    .withMessage('Title must not be more than 255 characters long'),
  check('rating')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Rating')
    .custom((value) => {
      if(value >= 0 && value <=5) return true;
      else {
        throw new Error('Rating must be between 0 and 5');
      }
    }),
];


/*
--------------ROUTES--------------
*/
router.post('/', reviewValidators, handleValidationErrors, asyncHandler( async (req, res) => {
  const {
    title,
    content,
    rating
  } = req.body
  const review = await Review.create({ title, content, rating, buildId:req.build.id, userId: req.user.id });
  res.json(review)
}))