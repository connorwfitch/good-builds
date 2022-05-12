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

// GET all builds on browse page
router.get('/', asyncHandler(async (req, res) => {
  const builds = await db.Build.findAll();

  let userId;
  if (req.session.auth) {
    userId = req.session.auth.userId;
  }

  res.render('builds-browse', { 
    title: 'Builds',
    builds,
    userId
  });
}));

// GET new build page.
router.get('/new', requireAuth, csrfProtection, (req, res) => {
  const build = db.Build.build();

  const { userId } = req.session.auth;

  res.render('new-build', {
    title: 'Create New Build',
    build,
    userId,
    csrfToken: req.csrfToken(),
  });
});

// POST new build page
router.post('/', requireAuth, csrfProtection, buildValidators, asyncHandler(async (req, res) => {
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
    req.session.save(() => res.redirect('/builds'))
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('new-build', {
      title: 'Create New Build',
      build,
      errors,
      userId,
      csrfToken: req.csrfToken(),
    });
  }
}));

// GET build by id
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const buildId = parseInt(req.params.id);
  const build = await db.Build.findByPk(buildId);

  if (req.session.auth) {
    const { userId } = req.session.auth;
  }

  res.render('build-detail', { 
    title: build.name,
    build,
    userId
  });
}));

module.exports = router;