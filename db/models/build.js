'use strict';
module.exports = (sequelize, DataTypes) => {
  const Build = sequelize.define('Build', {
    name: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    imageLink: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    legoItemNumber: DataTypes.INTEGER,
    pieceCount: DataTypes.INTEGER
  }, {});
  Build.associate = function(models) {
    // associations can be defined here
    Build.hasMany(models.Review, { foreignKey: 'buildId' });

    const columnMapShelf = {
      through: 'BuildAndShelf', // This is the model name referencing the join table.
      otherKey: 'shelfId',
      foreignKey: 'buildId'
    }
    Build.belongsToMany(models.DisplayShelf, columnMapShelf);
    
    const columnMapTheme = {
      through: 'BuildAndTheme', // This is the model name referencing the join table.
      otherKey: 'themeId',
      foreignKey: 'buildId'
    }
    Build.belongsToMany(models.Theme, columnMapTheme);
  };
  return Build;
};