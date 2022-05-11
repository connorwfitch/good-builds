'use strict';
const bcrypt = require('bcryptjs');
const { seedpass } = require('../../config');

  module.exports = {
    up: (queryInterface, Sequelize) => {
      /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      
      Example:
      */
     return queryInterface.bulkInsert('Users', [
       {firstName: "Dan", lastName: "Chin", email: "dan@gmail.com", hashedPassword: bcrypt.hashSync(seedpass, 12), createdAt: new Date(), updatedAt: new Date()},
       {firstName: "Alec", lastName: "Keeler", email: "akeel@gmail.com", hashedPassword: bcrypt.hashSync(seedpass, 12), createdAt: new Date(), updatedAt: new Date()},
       {firstName: "Khali", lastName: "Hill", email: "Khali@scruff.com", hashedPassword: bcrypt.hashSync(seedpass, 12), createdAt: new Date(), updatedAt: new Date()},
       {firstName: "Grant", lastName: "Christopherson", email: "Grant@gmail.com", hashedPassword: bcrypt.hashSync(seedpass, 12), createdAt: new Date(), updatedAt: new Date()},
       {firstName: "Christian", lastName: "Carteno", email: "Christian@aol.com", hashedPassword: bcrypt.hashSync(seedpass, 12), createdAt: new Date(), updatedAt: new Date()},
       {firstName: "Connor", lastName: "Fitch", email: "Connir@hotmail.com", hashedPassword: bcrypt.hashSync(seedpass, 12), createdAt: new Date(), updatedAt: new Date()},
       {firstName: "Britney", lastName: "Spears", email: "dontpickonme@gmail.com", hashedPassword: bcrypt.hashSync(seedpass, 12), createdAt: new Date(), updatedAt: new Date()},
       {firstName: "Moses", lastName: "Sumney", email: "personaljesus@yahoo.com", hashedPassword: bcrypt.hashSync(seedpass, 12), createdAt: new Date(), updatedAt: new Date()},
       {firstName: "James", lastName: "Murphy", email: "LCD@aol.com", hashedPassword: bcrypt.hashSync(seedpass, 12), createdAt: new Date(), updatedAt: new Date()},
       {firstName: "Beyonce", lastName: "Knowles", email: "QueenBee@gmail.com", hashedPassword: bcrypt.hashSync(seedpass, 12), createdAt: new Date(), updatedAt: new Date()},
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
