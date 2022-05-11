const express = require('express');
const req = require('express/lib/request');
const { db } = require('../db/models');
const { asyncHandler, bcrypt } = require('./utils');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user's first and last name and all their shelves */
router.get('/:id(\\d+)', asyncHandler(async(req, res) => { 
  const userId = parseInt(req.params.id, 10);
  console.log("TEST", userId)
  const user = await db.User.findByPk(userId)//, {
    //include: DisplayShelf                     //we'll include Builds too
 // })
  console.log("TEST2", user)
  res.render('user-page', {
    user.firstName,
    user.lastName
    // title,
    // subtitle
  });
}));

module.exports = router;
