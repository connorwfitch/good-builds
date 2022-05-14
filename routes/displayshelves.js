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

const displayShelfValidators = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a Title')
    .isLength({ max: 75 })
    .withMessage('Title must not be more than 75 characters long'),
  check('subtitle')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a Subtitle')
    .isLength({ max: 150 })
    .withMessage('Subtitle must not be more than 150 characters long'),
];

/*
--------------ROUTES--------------
*/

// GET new display shelf page.
router.get('/new', requireAuth, csrfProtection, (req, res) => {
  const displayShelf = db.DisplayShelf.build();

  res.render('new-display-shelf', {
    title: 'Create New Display Shelf',
    displayShelf,
    csrfToken: req.csrfToken(),
  });
});



// POST new display shelf page.
router.post('/', requireAuth, csrfProtection, displayShelfValidators, asyncHandler(async (req, res) => {
  const {
    title,
    subtitle
  } = req.body;

  const { userId } = req.session.auth;

  const displayShelf = db.DisplayShelf.build({
    title,
    subtitle,
    userId
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await displayShelf.save();
    req.session.save(() => res.redirect('/builds'))
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('new-display-shelf', {
      title: 'Create New Display Shelf',
      displayShelf,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

// GET display shelf delete page
router.get('/:id(\\d+)/delete', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  const shelfId = parseInt(req.params.id, 10);
  const displayShelf = await db.DisplayShelf.findByPk(shelfId);
  if (displayShelf.userId !== res.locals.user.id) {
    return res.redirect('/login');
  }
  res.render('display-shelf-delete', {
    title: `Warning: Delete Display Shelf: ${displayShelf.title}`,
    displayShelf,
    csrfToken: req.csrfToken(),
  });
}));

// POST builds delete page
router.post('/:id(\\d+)/delete', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  const shelfId = parseInt(req.params.id, 10);
  const displayShelf = await db.DisplayShelf.findByPk(shelfId);
  await displayShelf.destroy();
  req.session.save(res.redirect(`/users/${res.locals.user.id}`));
}));

// GET display shelf edit page
router.get('/:id(\\d+)/edit', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  const shelfId = parseInt(req.params.id, 10);

  const displayShelf = await db.DisplayShelf.findByPk(shelfId, {
    include: {
      model: db.BuildAndShelf,
      attributes: ['id', 'buildStatus'],
      include: {
        model: db.Build
      }
    }
  });

  if (displayShelf.userId !== res.locals.user.id) {
    return res.redirect('/login');
  }
  res.render('display-shelf-edit', {
    title: `Edit Display Shelf: ${displayShelf.title}`,
    displayShelf,
    csrfToken: req.csrfToken(),
  });
}));

// POST display shelf edit page
router.post('/:id(\\d+)/edit', requireAuth, csrfProtection, displayShelfValidators, asyncHandler(async (req, res) => {
  const {
    title,
    subtitle
  } = req.body;

  const shelfId = parseInt(req.params.id);
  
  const displayShelf = await db.DisplayShelf.findByPk(shelfId, {
    include: {
      model: db.BuildAndShelf,
      attributes: ['id', 'buildStatus'],
      include: {
        model: db.Build
      }
    }
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    displayShelf.title = title;
    displayShelf.subtitle = subtitle;

    await displayShelf.save();
    req.session.save(() => res.redirect(`/users/${displayShelf.userId}`));
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('display-shelf-edit', {
      title: `Edit Display Shelf: ${displayShelf.title}`,
      displayShelf,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));
  
module.exports = router;