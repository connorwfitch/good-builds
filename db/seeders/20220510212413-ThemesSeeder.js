'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Themes', [
        {name: "Marvel", createdAt: new Date(), updatedAt: new Date()},
        {name: "Star Wars", createdAt: new Date(), updatedAt: new Date()},
        {name: "Harry Potter", createdAt: new Date(), updatedAt: new Date()},
        {name: "Creator Expert", createdAt: new Date(), updatedAt: new Date()},
        {name: "Animal Life", createdAt: new Date(), updatedAt: new Date()},
        {name: "Vehicles", createdAt: new Date(), updatedAt: new Date()},
        {name: "Adventure", createdAt: new Date(), updatedAt: new Date()}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Themes', null, {});
  }
};
