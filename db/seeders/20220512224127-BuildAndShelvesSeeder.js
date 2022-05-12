'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkInsert('BuildAndShelves', [
      // shelf 1 - Dan Coolest Builds
      { buildStatus: "Will Build", buildId: 3, shelfId: 1, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "In Progress", buildId: 4, shelfId: 1, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "Built", buildId: 14, shelfId: 1, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "Built", buildId: 8, shelfId: 1, createdAt: new Date(), updatedAt: new Date()},
      // shelf 2 - Dan Wish List
      { buildStatus: "Will Build", buildId: 3, shelfId: 2, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "Will Build", buildId: 1, shelfId: 2, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "Will Build", buildId: 13, shelfId: 2, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "Will Build", buildId: 15, shelfId: 2, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "Will Build", buildId: 2, shelfId: 2, createdAt: new Date(), updatedAt: new Date()},
      // shelf 3 - Alec Favorite Movies
      { buildStatus: "Built", buildId: 1, shelfId: 3, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "In Progress", buildId: 2, shelfId: 3, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "Built", buildId: 7, shelfId: 3, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "Built", buildId: 6, shelfId: 3, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "Built", buildId: 14, shelfId: 3, createdAt: new Date(), updatedAt: new Date()},
      // shelf 4 - Khali Awesome Vehicles
      { buildStatus: "Built", buildId: 9, shelfId: 4, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "Will Build", buildId: 10, shelfId: 4, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "In Progress", buildId: 3, shelfId: 4, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "Will Build", buildId: 15, shelfId: 4, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "Will Build", buildId: 13, shelfId: 4, createdAt: new Date(), updatedAt: new Date()},
      // shelf 5 - Grant MineCraft
      { buildStatus: "Built", buildId: 7, shelfId: 5, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "In Progress", buildId: 11, shelfId: 4, createdAt: new Date(), updatedAt: new Date()},
      { buildStatus: "Will Build", buildId: 12, shelfId: 4, createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('BuildAndShelves', null, {});
  }
};
