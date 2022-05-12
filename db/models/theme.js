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
    const columnMapping = {
      through: 'BuildAndTheme', // This is the model name referencing the join table.
      otherKey: 'buildId',
      foreignKey: 'themeId'
    }
    Theme.belongsToMany(models.Build, columnMapping);

    Theme.hasMany(models.BuildAndTheme, { foreignKey: 'themeId', onDelete: 'CASCADE', hooks: true });
  };
  return Theme;
};