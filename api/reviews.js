// external modules
const express = require('express');
const { check } = require('express-validator');

// internal modules
const db = require('../db/models');
const { handleValidationErrors, asyncHandler } = require('./utils');

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
    rating,
    buildId,
    userId
  } = req.body
  const review = await db.Review.create({ title, content, rating, buildId, userId });
  res.json({
    message: 'Success',
    review
  });
}));

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
  const review = await db.Review.findByPk(req.params.id)
  if (review) {
    await review.destroy()
    res.json({ message: 'Success' })
  } else {
    res.json({ message: 'Fail' })
  }
}))


module.exports = router;