'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkInsert('BuildAndThemes', [
      { buildId: 2, themeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 14, themeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 1, themeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 15, themeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 5, themeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 3, themeId: 4, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 9, themeId: 4, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 16, themeId: 4, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 14, themeId: 4, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 4, themeId: 5, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 1, themeId: 6, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 3, themeId: 6, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 9, themeId: 6, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 10, themeId: 6, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 13, themeId: 6, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 15, themeId: 6, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 1, themeId: 7, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 5, themeId: 7, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 8, themeId: 7, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 10, themeId: 7, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 11, themeId: 7, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 12, themeId: 7, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 13, themeId: 7, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 15, themeId: 7, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 6, themeId: 8, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 7, themeId: 8, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 11, themeId: 9, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 12, themeId: 9, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 10, themeId: 10, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 16, themeId: 11, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 10, themeId: 12, createdAt: new Date(), updatedAt: new Date() },
      { buildId: 13, themeId: 12, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkDelete('BuildAndThemes', null, {});
  }
};
