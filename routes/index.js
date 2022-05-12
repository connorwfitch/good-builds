const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let userId;
  if (req.session.auth) {
    userId = req.session.auth.userId;
  }

  res.render('index', { 
    title: 'GoodBuilds',
    userId 
  });
});

module.exports = router;
