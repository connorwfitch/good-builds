'use strict';
const bcrypt = require('bcryptjs');
const { seedpass1, seedpass2 } = require('../../config');
// console.log(seedpass2);
// async function makeHashes() {
  // const hash1 = await bcrypt.hash(seedpass1, 12);
  // const hash2 = bcrypt.hashSync(seedpass2, 12);
  //   return {hash1:hash1, hash2:hash2};
  // }
  // const {hash1, hash2} = makeHashes();
  // console.log(hash2);
  module.exports = {
    up: (queryInterface, Sequelize) => {
      /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      
      Example:
      */
     return queryInterface.bulkInsert('Users', [
       {firstName: "Dan", lastName: "Chin", email: "dan@gmail.com", hashedPassword: bcrypt.hashSync(seedpass1, 12), createdAt: new Date(), updatedAt: new Date()},
       {firstName: "Alec", lastName: "Keeler", email: "akeel@gmail.com", hashedPassword: bcrypt.hashSync(seedpass2, 12), createdAt: new Date(), updatedAt: new Date()}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Users', null, {});
  }
};
