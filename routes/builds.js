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

const buildValidators = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Name')
    .isLength({ max: 75 })
    .withMessage('Name must not be more than 75 characters long'),
  check('imageLink')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Image Link'),
  check('legoItemNumber')
    .custom((value) => {
      // automatic promise resolve if there is no legoitem number
      if(!value) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 1);
        })
      }
      return db.Build.findOne({ where: { legoItemNumber: value } })
        .then((build) => {
          if (build) {
            return Promise.reject('The provided Lego Item Number is already in use by another Build');
          }
        });
    }),
];

/*
--------------ROUTES--------------
*/

// GET new build page.
router.get('/new', requireAuth, csrfProtection, (req, res) => {
  const build = db.Build.build();
  res.render('new-build', {
    title: 'Create New Build',
    build,
    csrfToken: req.csrfToken(),
  });
});

// POST new build page
router.post('/new', requireAuth, csrfProtection, buildValidators, asyncHandler(async (req, res) => {
  const {
    name,
    imageLink,
    legoItemNumber,
    pieceCount
  } = req.body;

  const { userId } = req.session.auth;

  const build = db.Build.build({
    name,
    imageLink,
    userId
  });

  if (legoItemNumber) {
    build.legoItemNumber = legoItemNumber;
  }

  if (pieceCount) {
    build.pieceCount = pieceCount;
  }

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await build.save();
    req.session.save(() => res.redirect('/'))
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('new-build', {
      title: 'Create New Build',
      build,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

module.exports = router;