'use strict';
module.exports = (sequelize, DataTypes) => {
  const BuildAndShelf = sequelize.define('BuildAndShelf', {
    buildStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    buildId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shelfId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  BuildAndShelf.associate = function(models) {
    // associations can be defined here
    BuildAndShelf.belongsTo(models.Build, { foreignKey: 'buildId' });
    BuildAndShelf.belongsTo(models.DisplayShelf, { foreignKey: 'shelfId' });
  };
  return BuildAndShelf;
};