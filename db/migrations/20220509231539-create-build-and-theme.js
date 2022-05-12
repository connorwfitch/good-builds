'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BuildAndThemes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buildId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Builds",
          key: "id"
        }
      },
      themeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Themes",
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
    return queryInterface.dropTable('BuildAndThemes');
  }
};