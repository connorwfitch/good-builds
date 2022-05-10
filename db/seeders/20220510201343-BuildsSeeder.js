'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Builds', [
      {name: "Imperial Star Destroyer", imageLink: "https://www.lego.com/cdn/cs/set/assets/blt934044fa508776e2/75252.jpg?fit=bounds&format=jpg&quality=80&width=1500&height=1500&dpr=1", legoItemNumber: 75252, pieceCount: 4784, userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: "I Am Groot", imageLink: "https://www.lego.com/cdn/cs/set/assets/blt786d9a5e1bafd414/76217.png?fit=bounds&format=png&width=528&height=528&dpr=1", legoItemNumber: 76217, pieceCount: 476, userId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: "Vespa 125", imageLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUcxpkjSJv47NcFlAxpLbyZrscdopeE2vr-NyE2PY4YAS9LI-G0oHIDIRUBpGmRZ4RU_I&usqp=CAU", legoItemNumber: 10298, pieceCount: 1107, userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: "Fish Tank", imageLink: "https://www.lego.com/cdn/cs/set/assets/bltd6a54109dcd9419c/31122_alt7.png", legoItemNumber: 31122, pieceCount: 352, userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: "Hungarian Horntail Dragon", imageLink: "https://www.lego.com/cdn/cs/set/assets/bltc418d2bb1a3af8f6/76406_alt1.png?fit=bounds&format=png&width=1600&height=1600&dpr=1", legoItemNumber: 76406, pieceCount: 671, userId: 1, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Builds', null, {});
  }
};
