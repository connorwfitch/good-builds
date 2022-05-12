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
        .isLength({ max: 75 })
        .withMessage('Subtitle must not be more than 75 characters long'),
];

/*
--------------ROUTES--------------
*/

// // GET Display Shelf on browse page
// router.get('/', asyncHandler(async (req, res) => {
//   const displayShelves = await db.DisplayShelf.findAll();

//   res.render('displayShelves-browse', { 
//     title: 'Display Shelves',
//     displayShelves,
//   });
// }));

// GET new display shelf page.
router.get('/new', requireAuth, csrfProtection, (req, res) => {
    const displayShelf = db.DisplayShelf.build();

    res.render('new-displayShelf', {
      title: 'Create New Display Shelf',
      displayShelf,
      csrfToken: req.csrfToken(),
    });
  });



// POST new display shelf page.
router.post('/'/* does this need to be "/new"? */, requireAuth, csrfProtection, displayShelfValidators, asyncHandler(async (req, res) => {
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
  
    if (title) {
      displayShelf.title = title;
    }
  
    if (subtitle) {
      build.subtitle = subtitle;
    }
  
    const validatorErrors = validationResult(req);
  
    if (validatorErrors.isEmpty()) {
      await displayShelf.save();
      req.session.save(() => res.redirect(`displayShelves/${displayShelf.id}`))
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('new-displayShelf', {
        title: 'Create New Display Shelf',
        displayShelf,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));
  
  module.exports = router;