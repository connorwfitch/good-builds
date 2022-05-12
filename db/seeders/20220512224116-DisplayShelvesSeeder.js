'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkInsert('DisplayShelves', [
      { title: 'Coolest Builds Ever', subtitle: 'These are legit the coolest ever', userId: 1, createdAt: new Date(), updatedAt: new Date()},
      { title: 'My Wish List', subtitle: 'I really wish I had these builds IRL', userId: 1, createdAt: new Date(), updatedAt: new Date()},
      { title: 'Sets from my favorite movies', subtitle: 'These are some of the sets from my favorite movies', userId: 2, createdAt: new Date(), updatedAt: new Date()},
      { title: 'Totally Awesome Vehicles', subtitle: 'Vroom Vroom BABY!', userId: 3, createdAt: new Date(), updatedAt: new Date()},
      { title: 'Video Games and Frozen', subtitle: 'What more could a Grant want in this life?', userId: 4, createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkDelete('DisplayShelves', null, {});
  }
};
