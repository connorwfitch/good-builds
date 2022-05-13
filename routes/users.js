// external modules
const express = require('express');
const { check, validationResult } = require('express-validator');

// internal modules
const db = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');
const { requireAuth, logoutUser } = require('../auth');

const router = express.Router();

/*
--------------VALIDATORS--------------
*/

const userValidators = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name')
    .isLength({ max: 50 })
    .withMessage('First Name must not be more than 50 characters long'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Last Name')
    .isLength({ max: 50 })
    .withMessage('Last Name must not be more than 50 characters long'),
];


/*
--------------ROUTES--------------
*/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user's first and last name and all their builds and shelves */
router.get('/:id(\\d+)', requireAuth, asyncHandler(async(req, res) => { 
  const userId = parseInt(req.params.id, 10);

  // need to call this something other than user otherwise we get into issues with overwriting res.locals.user
  const userDetail = await db.User.findByPk(userId, {
    include: [
      {
        model: db.Build
      },
      {
        model: db.DisplayShelf,
        include: {
          model: db.Build
        }
      }
    ]
  });

  res.render('user-detail', {
    title: `${userDetail.firstName} ${userDetail.lastName}`,
    userDetail
  });
}));

// GET user edit page
router.get('/:id(\\d+)/edit', requireAuth, csrfProtection, (req, res) => {
  const userId = parseInt(req.params.id, 10);
  // checking to make sure the editor is the user themselves
  if(userId !== res.locals.user.id) {
    // if not the user, add an error message and redirect them to log in
    // ideally want to pass this error in somehow
    // errors = ['Must be logged in as the user to edit the profile'];
    return res.redirect('/login');
  } else {
    res.render('user-edit', {
      title: "Edit User Profile",
      user: res.locals.user,
      csrfToken: req.csrfToken(),
    });
  }
});

// POST user (for edits)
router.post('/:id(\\d+)', requireAuth, csrfProtection, userValidators, asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    imageLink
  } = req.body;

  const user = res.locals.user;

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.imageLink = imageLink;
    await user.save();
    req.session.save(() => res.redirect(`/users/${user.id}`))
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('user-edit', {
      title: 'Edit User Profile',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

// GET user delete
router.get('/:id(\\d+)/delete', requireAuth, csrfProtection, (req, res) => {
  const userId = parseInt(req.params.id, 10);
  // checking to make sure the editor is the user themselves
  if (userId !== res.locals.user.id) {
    // if not the user, add an error message and redirect them to log in
    // ideally want to pass this error in somehow
    // errors = ['Must be logged in as the user to delete the profile'];
    return res.redirect('/login');
  } else {
    res.render('user-delete', {
      title: "Warning: Delete User Profile",
      user: res.locals.user,
      csrfToken: req.csrfToken(),
    });
  }
});

router.post('/:id(\\d+)/delete', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = await db.User.findByPk(userId);
  logoutUser(req, res);
  await user.destroy();
  req.session.save(res.redirect('/'));
}));

module.exports = router;
