'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Themes', [
        {name: "Marvel"},
        {name: "Star Wars"},
        {name: "Harry Potter"},
        {name: "Creator Expert"},
        {name: "Animal Life"},
        {name: "Vehicles"},
        {name: "Adventure"}
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
