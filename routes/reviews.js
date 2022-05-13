// external modules
const express = require('express');
const { check, validationResult } = require('express-validator');

// internal modules
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { requireAuth } = require('../auth');

// creating router
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
      if (value >= 0 && value <= 5) return true;
      else {
        throw new Error('Rating must be between 0 and 5');
      }
    }),
];

/*
--------------ROUTES--------------
*/

// GET edit page
router.get('/:id(\\d+)/edit', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  const reviewId = parseInt(req.params.id);
  const review = await db.Review.findByPk(reviewId);
  const build = await db.Build.findByPk(review.buildId);

  res.render('review-edit', {
    title: "Edit Review",
    review,
    build,
    csrfToken: req.csrfToken(),
  });
}));

// POST edits
router.post('/:id(\\d+)', csrfProtection, reviewValidators, asyncHandler(async (req, res) => {
  const {
    title,
    rating,
    content
  } = req.body;
  const reviewId = parseInt(req.params.id);
  const review = await db.Review.findByPk(reviewId);
  const validatorErrors = validationResult(req);

  const buildId = review.buildId;

  if (validatorErrors.isEmpty()) {
    review.title = title;
    review.rating = rating;
    review.content = content;

    await review.save();
    req.session.save(() => res.redirect(`/builds/${buildId}`))
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    const build = await db.Build.findByPk(buildId);
    res.render(`review-edit`, {
      title: "Edit Review",
      review,
      build,
      errors,
      csrfToken: req.csrfToken(),
    });
  }

}));

module.exports = router;