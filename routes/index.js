// external modules
const express = require('express');

// internal modules
const db = require('../db/models');
const { asyncHandler } = require('./utils');

// creating the router
const router = express.Router();

/* GET home page. */
router.get('/', asyncHandler( async function(req, res, next) {

  const newestBuilds = await db.Build.findAll({
    limit: 8,
    order: [['createdAt', 'DESC']],
  })

  const oldestShelf = await db.DisplayShelf.findOne({
    include: {
      model: db.Build,
      include: {
        model: db.BuildAndShelf,
      }
    }
  })

  res.render('index', { 
    title: 'GoodBuilds',
    newestBuilds,
    oldestShelf
  });
}));

module.exports = router;
