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
          }, 0);
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

const editValidators = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Name')
    .isLength({ max: 75 })
    .withMessage('Name must not be more than 75 characters long'),
  check('imageLink')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Image Link'),
  check('legoItemNumber')
    .custom((value, { req }) => {
      // automatic promise resolve if there is no legoitem number
      if (!value) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 0);
        });
      }
      return db.Build.findOne({ where: { legoItemNumber: value } })
        .then((build) => {
          if (build.id !== parseInt(req.params.id)) {
            return Promise.reject('The provided Lego Item Number is already in use by another Build');
          } else {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 0);
            });
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

  res.render('builds-browse', { 
    title: 'Builds',
    builds,
  });
}));

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
    req.session.save(() => res.redirect(`builds/${build.id}`))
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

// GET build by id
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const buildId = parseInt(req.params.id);
  const build = await db.Build.findByPk(buildId, {
    include: [
      {
        model: db.Theme
      },
      {
        model: db.Review,
        // include: {
        //   model: db.User
        // }
      }
    ]
  });
  let sum = 0;
  for(let i = 0; i < build.Reviews.length; i++){
    sum += build.Reviews[i].rating;
  };
  let averageRating = sum/build.Reviews.length;

  let themeString = build.Themes.reduce((str, theme) => {
    return `${str}, ${theme.name}`;
  }, '');

  if(themeString) {
    themeString = themeString.slice(1);
  }

  res.render('build-detail', { 
    title: build.name,
    build,
    themeString,
    averageRating
  });
}));

// GET Build edit page
router.get('/:id(\\d+)/edit', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  const buildId = parseInt(req.params.id);
  const build = await db.Build.findByPk(buildId);
  res.render('build-edit',{
    title: "Edit Build",
    build,
    csrfToken: req.csrfToken(),
  });
}));

// POST Build (for edits)
router.post('/:id(\\d+)',csrfProtection, editValidators, asyncHandler(async (req, res) => {
  const {
    name,
    pieceCount,
    legoItemNumber,
    imageLink
  } = req.body;
  const buildId = parseInt(req.params.id);
  const build = await db.Build.findByPk(buildId);
  const validatorErrors = validationResult(req);
  
  if (validatorErrors.isEmpty()) {
    build.name = name;
    if(pieceCount) build.pieceCount = pieceCount;
    if(legoItemNumber) build.legoItemNumber = legoItemNumber;
    build.imageLink = imageLink;
    await build.save();
    req.session.save(() => res.redirect(`/builds/${buildId}`))
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render(`build-edit`, {
      title: "Edit Build",
      build,
      errors,
      csrfToken: req.csrfToken(),
    });
  }

}));

router.get('/:id(\\d+)/delete', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  const buildId = parseInt(req.params.id, 10);
  const build = await db.Build.findByPk(buildId);
  if (build.userId !== res.locals.user.id) {
    return res.redirect('/login');
  }
  res.render('build-delete', {
    title: "Warning: Delete Build",
    user: res.locals.user,
    build,
    csrfToken: req.csrfToken(),
  });
}));

router.post('/:id(\\d+)/delete', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  const buildId = parseInt(req.params.id, 10);
  const build = await db.Build.findByPk(buildId);
  await build.destroy();
  req.session.save(res.redirect(`/users/${res.locals.user.id}`));
}));



module.exports = router;