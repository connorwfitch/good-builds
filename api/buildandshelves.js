// external modules
const express = require('express');

// internal modules
const db = require('../db/models');
const { asyncHandler } = require('./utils');

const router = express.Router();


/*
--------------ROUTES--------------
*/

// POST to api
router.post('/', asyncHandler(async (req, res) => {
  const {
    buildId,
    shelfId,
    buildStatus
  } = req.body

  // checking if someone already has that build on that shelf
  let buildAndShelf = await db.BuildAndShelf.findOne({
    where: {
      buildId,
      shelfId
    }
  });
  // if so, we will just update it for them
  if (buildAndShelf) {
    buildAndShelf.buildStatus = buildStatus;
    await buildAndShelf.save();
  } else {
    buildAndShelf = await db.BuildAndShelf.create({ buildId, shelfId, buildStatus });
  }
  res.json({
    message: 'Success',
    buildAndShelf
  });
}));

// DELETE from api
router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
  const buildAndShelf = await db.BuildAndShelf.findOne({
    where: {
      id: parseInt(req.params.id)
    }
  });
  
  if (buildAndShelf) {
    await buildAndShelf.destroy()
    res.json({ message: 'Success' })
  } else {
    res.json({ message: 'Fail' })
  }
}))

// PUT api
router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
  const {
    buildStatus
  } = req.body
  const buildAndShelf = await db.BuildAndShelf.findOne({
    where: {
      id: parseInt(req.params.id)
    }
  });
  if (buildAndShelf) {
    buildAndShelf.buildStatus = buildStatus;
    await buildAndShelf.save();
    res.json({ 
      message: 'Success', 
      buildAndShelf
    })
  } else {
    res.json({ message: 'Fail' })
  }
}))


module.exports = router;