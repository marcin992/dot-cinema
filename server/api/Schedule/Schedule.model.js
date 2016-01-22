'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Schedule', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date_start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_end: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    underscored: true,
    tableName: 'schedules'
  });
};
