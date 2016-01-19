'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Schedule', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
  }, {
    underscored: true,
    tableName: 'ratings'
  });
};
