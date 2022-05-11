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
      {name: "I Am Groot", imageLink: "https://www.lego.com/cdn/cs/set/assets/blt786d9a5e1bafd414/76217.png?fit=bounds&format=png&width=528&height=528&dpr=1", legoItemNumber: 76217, pieceCount: 476, userId: 5, createdAt: new Date(), updatedAt: new Date()},
      {name: "Vespa 125", imageLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUcxpkjSJv47NcFlAxpLbyZrscdopeE2vr-NyE2PY4YAS9LI-G0oHIDIRUBpGmRZ4RU_I&usqp=CAU", legoItemNumber: 10298, pieceCount: 1107, userId: 6, createdAt: new Date(), updatedAt: new Date()},
      {name: "Fish Tank", imageLink: "https://www.lego.com/cdn/cs/set/assets/bltd6a54109dcd9419c/31122_alt7.png", legoItemNumber: 31122, pieceCount: 352, userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: "Hungarian Horntail Dragon", imageLink: "https://www.lego.com/cdn/cs/set/assets/bltc418d2bb1a3af8f6/76406_alt1.png?fit=bounds&format=png&width=1600&height=1600&dpr=1", legoItemNumber: 76406, pieceCount: 671, userId: 9, createdAt: new Date(), updatedAt: new Date()},
      {name: "The Disney Castle", imageLink: "https://www.lego.com/cdn/cs/set/assets/blt9ecbcfc462381676/71040.jpg?fit=bounds&format=jpg&quality=80&width=528&height=528&dpr=1", legoItemNumber: 71040, pieceCount: 4080, userId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: "The Ice Castle", imageLink: "https://www.lego.com/cdn/cs/set/assets/bltf327b4fc93bcfccf/43197.jpg?fit=bounds&format=webply&quality=80&width=528&height=528&dpr=1,", legoItemNumber: 43197, pieceCount: 1709, userId: 8, createdAt: new Date(), updatedAt: new Date()},
      {name: "The Upside Down", imageLink: "https://www.lego.com/cdn/cs/set/assets/bltc7618b3e8c497a2e/75810.jpg?fit=bounds&format=webply&quality=80&width=528&height=528&dpr=1,", legoItemNumber: 75810, pieceCount: 2287, userId: 3, createdAt: new Date(), updatedAt: new Date()},
      {name: "Land Rover Defender", imageLink: "https://www.lego.com/cdn/cs/set/assets/blt543edb31db6e8889/42110.jpg?fit=bounds&format=webply&quality=80&width=528&height=528&dpr=1,", legoItemNumber: 42110, pieceCount: 2573, userId: 4, createdAt: new Date(), updatedAt: new Date()},
      {name: "The Batman - Batmobile", imageLink: "https://www.lego.com/cdn/cs/set/assets/bltc2661d66536e8c5d/42127.png?fit=bounds&format=webply&quality=80&width=528&height=528&dpr=1,", legoItemNumber: 42127, pieceCount: 1360, userId: 7, createdAt: new Date(), updatedAt: new Date()},
      {name: "The Ruined Portal", imageLink: "https://www.lego.com/cdn/cs/set/assets/blt15d7ade06bd8d420/21172.jpg?fit=bounds&format=jpg&quality=80&width=800&height=800&dpr=1", legoItemNumber: 21172, pieceCount: 316, userId: 8, createdAt: new Date(), updatedAt: new Date()},
      {name: "The First Adventure", imageLink: "https://www.lego.com/cdn/cs/set/assets/blt5ee812e438f981c2/21169.jpg?fit=bounds&format=jpg&quality=80&width=800&height=800&dpr=1", legoItemNumber: 21169, pieceCount: 542, userId: 6, createdAt: new Date(), updatedAt: new Date()},
      {name: "1989 Batmobile", imageLink: "https://www.lego.com/cdn/cs/set/assets/blt9befac2e78d2930f/76139.jpg?fit=bounds&format=jpg&quality=80&width=800&height=800&dpr=1", legoItemNumber: 76139, pieceCount: 3308, userId: 4, createdAt: new Date(), updatedAt: new Date()},
      {name: "Infinity Gauntlet", imageLink: "https://www.lego.com/cdn/cs/set/assets/blt1a8584eb77adfeb6/76191.jpg?fit=bounds&format=jpg&quality=80&width=800&height=800&dpr=1", legoItemNumber: 76191, pieceCount: 590, userId: 9, createdAt: new Date(), updatedAt: new Date()},
      {name: "AT-AT", imageLink: "https://www.lego.com/cdn/cs/set/assets/blta7b7b825b6d4fc0a/75313_Prod.png?fit=bounds&format=png&width=800&height=800&dpr=1", legoItemNumber: 75313, pieceCount: 6785, userId: 3, createdAt: new Date(), updatedAt: new Date()},
      {name: "Taj Mahal", imageLink: "https://www.lego.com/cdn/cs/set/assets/blt10cbc9ffc0459599/21056.jpg?fit=bounds&format=jpg&quality=80&width=800&height=800&dpr=1", legoItemNumber: 21056, pieceCount: 2022, userId: 7, createdAt: new Date(), updatedAt: new Date()}
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
