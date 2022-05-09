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
  };
  return DisplayShelf;
};