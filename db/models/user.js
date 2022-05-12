'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(255)
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    },
    imageLink: DataTypes.TEXT
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Review, { foreignKey: 'userId' });
    User.hasMany(models.DisplayShelf, { foreignKey: 'userId' });
    User.hasMany(models.Build, { foreignKey: 'userId' });
  };
  return User;
};