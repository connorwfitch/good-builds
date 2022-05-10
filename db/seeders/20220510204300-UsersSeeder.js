'use strict';
const bcrypt = require('bcryptjs');
const { seedpass1, seedpass2 } = require('../../config')
const hash1 = await bcrypt.hash(seedpass1, 12);
const hash2 = await bcrypt.hash(seedpass2, 12);

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('People', null, {});
  }
};
