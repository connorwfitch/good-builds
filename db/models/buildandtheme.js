'use strict';
module.exports = (sequelize, DataTypes) => {
  const BuildAndTheme = sequelize.define('BuildAndTheme', {
    buildId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    themeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  BuildAndTheme.associate = function(models) {
    // associations can be defined here
    BuildAndTheme.belongsTo(models.Build, { foreignKey: 'buildId' });
    BuildAndTheme.belongsTo(models.Theme, { foreignKey: 'themeId' });
  };
  return BuildAndTheme;
};