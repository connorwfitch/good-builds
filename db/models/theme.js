'use strict';
module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define('Theme', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {});
  Theme.associate = function(models) {
    // associations can be defined here
  };
  return Theme;
};