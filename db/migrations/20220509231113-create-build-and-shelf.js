'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BuildsAndShelves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buildStatus: {
        allowNull: false,
        type: Sequelize.STRING
      },
      buildId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Builds",
          key: "id"
        }
      },
      shelfId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "DisplayShelves",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BuildsAndShelves');
  }
};