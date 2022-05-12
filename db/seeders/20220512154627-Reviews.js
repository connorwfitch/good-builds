'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      
      Example:
      */
    return queryInterface.bulkInsert('Reviews', [
      {title: "Star Destroyer is amazing", content: "Had sooo much fun putting this beast together, about to destroy everything with it.", rating: "5", userId: "1", buildId: "1", createdAt: new Date(), updatedAt: new Date()},
      {title: "Groot is just OK", content: "Wanted to like him more than I did", rating: "2", userId: "5", buildId: "2", createdAt: new Date(), updatedAt: new Date()},
      {title: "Yay Vespa!", content: "OMG, I love this little guy!", rating: "5", userId: "6", buildId: "3", createdAt: new Date(), updatedAt: new Date()},
      {title: "Mediocre fish tank", content: "Not exactly sure what I expected", rating: "1", userId: "1", buildId: "4", createdAt: new Date(), updatedAt: new Date()},
      {title: "Gotta Love the Horntail", content: "I mean... DRAGONS?! what more is there to say.", rating: "5", userId: "9", buildId: "5", createdAt: new Date(), updatedAt: new Date()},
      {title: "An alright castle", content: "It's a castle, and it's Disney. Meh.", rating: "3", userId: "2", buildId: "6", createdAt: new Date(), updatedAt: new Date()},
      {title: "FROZEN CASTLE DREAMS", content: "Now I can have sing-a-longs in my castle", rating: "5", userId: "8", buildId: "7", createdAt: new Date(), updatedAt: new Date()},
      {title: "Downside Up!", content: "There's no downside to this build", rating: "5", userId: "3", buildId: "8", createdAt: new Date(), updatedAt: new Date()},
      {title: "Broke down Land Rover", content: "Ordered this, and it was missing a wheel?!", rating: "1", userId: "4", buildId: "9", createdAt: new Date(), updatedAt: new Date()},
      {title: "Pretty, pretty awesome", content: "Inarguably the best Batmobile", rating: "5", userId: "7", buildId: "10", createdAt: new Date(), updatedAt: new Date()},
      {title: "Love Ruined Portal", content: "What can I say, Minecraft supa-fan", rating: "5", userId: "8", buildId: "11", createdAt: new Date(), updatedAt: new Date()},
      {title: "First Adventure, but not the last", content: "Minecraft Forever", rating: "5", userId: "6", buildId: "12", createdAt: new Date(), updatedAt: new Date()},
      {title: "Old-School and Incredible", content: "Tim Burton's batmobile sets the bar", rating: "5", userId: "4", buildId: "13", createdAt: new Date(), updatedAt: new Date()},
      {title: "OOoooh, SNAP!", content: "I now rule the universe", rating: "5", userId: "9", buildId: "14", createdAt: new Date(), updatedAt: new Date()},
      {title: "One Taj to rule them all", content: "Love the finished build, this one's super cool.", rating: "5", userId: "7", buildId: "16", createdAt: new Date(), updatedAt: new Date()},
      {title: "A Frozen thing to regift.", content: "Hated it then, Hate it now.", rating: "1", userId: "2", buildId: "7", createdAt: new Date(), updatedAt: new Date()},
      {title: "My last adventure with the First Adventure", content: "This build makes me hate minecraft", rating: "1", userId: "4", buildId: "12", createdAt: new Date(), updatedAt: new Date()},
      {title: "Thought I'd love it more", content: "It seems cooler than it is", rating: "3", userId: "1", buildId: "8", createdAt: new Date(), updatedAt: new Date()},
      {title: "Marvel madness", content: "Wish it was a life size build I could wear", rating: "4", userId: "14", buildId: "14", createdAt: new Date(), updatedAt: new Date()},
      {title: "My Star Wars dreams came true", content: "Finally put this amazing thing together", rating: "5", userId: "9", buildId: "1", createdAt: new Date(), updatedAt: new Date()},
      {title: "GRRRROOOOOOTTTT!!!", content: "Little build, big heart", rating: "4", userId: "8", buildId: "2", createdAt: new Date(), updatedAt: new Date()},
      {title: "Portal Paradise", content: "Just wished I could portal away", rating: "4", userId: "7", buildId: "11", createdAt: new Date(), updatedAt: new Date()},
      {title: "Destroyer of Everything", content: "If I could, I'd bring this with me everywhere...  I'm in love.", rating: "5", userId: "8", buildId: "1", createdAt: new Date(), updatedAt: new Date()},
      {title: "Taaaaaj!!!", content: "I'm an architecture geek, highly recommend this one.", rating: "5", userId: "6", buildId: "16", createdAt: new Date(), updatedAt: new Date()},
      {title: "Strangely glorious", content: "Not sure why this soo strangely cool", rating: "4", userId: "2", buildId: "8", createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
