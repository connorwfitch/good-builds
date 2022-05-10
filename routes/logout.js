// external modules
const express = require('express');

// internal modules
const { logoutUser } = require('../auth');

// creating router
const router = express.Router();

router.post('/', (req, res) => {
  logoutUser(req, res);
  req.session.save(() => res.redirect('/'));
});

module.exports = router;