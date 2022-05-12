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
    User.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true});
    User.hasMany(models.DisplayShelf, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true});
    User.hasMany(models.Build, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true});
  };
  return User;
};