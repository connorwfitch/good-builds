'use strict';
module.exports = (sequelize, DataTypes) => {
  const DisplayShelf = sequelize.define('DisplayShelf', {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    subtitle: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  DisplayShelf.associate = function(models) {
    // associations can be defined here
    DisplayShelf.belongsTo(models.User, { foreignKey: 'userId' });
    
    const columnMapping = {
      through: 'BuildAndShelf', // This is the model name referencing the join table.
      otherKey: 'buildId',
      foreignKey: 'shelfId'
    }
    DisplayShelf.belongsToMany(models.Build, columnMapping);
  };
  return DisplayShelf;
};