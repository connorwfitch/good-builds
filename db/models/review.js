'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buildId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};