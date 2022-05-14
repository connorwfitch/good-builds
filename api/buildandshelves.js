// external modules
const express = require('express');

// internal modules
const db = require('../db/models');
const { asyncHandler } = require('./utils');

const router = express.Router();


/*
--------------ROUTES--------------
*/
router.post('/', asyncHandler(async (req, res) => {
  const {
    buildId,
    shelfId,
    buildStatus
  } = req.body
  const buildandshelf = await db.BuildAndShelf.create({ buildId, shelfId, buildStatus });
  res.json({
    message: 'Success',
    buildandshelf
  });
}));

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
  const review = await db.Review.findByPk(req.params.id)
  if (review) {
    await review.destroy()
    res.json({ message: 'Success' })
  } else {
    res.json({ message: 'Fail' })
  }
}))


module.exports = router;