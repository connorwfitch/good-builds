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
  };
  return Build;
};