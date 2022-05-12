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
    pieceCount: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Build.associate = function(models) {
    // associations can be defined here
    Build.hasMany(models.Review, { foreignKey: 'buildId', onDelete: 'CASCADE', hooks: true });

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

    Build.belongsTo(models.User, { foreignKey: 'userId' });

    Build.hasMany(models.BuildAndTheme, { foreignKey: 'buildId', onDelete: 'CASCADE', hooks: true });
    Build.hasMany(models.BuildAndShelf, { foreignKey: 'buildId', onDelete: 'CASCADE', hooks: true });
  };
  return Build;
};