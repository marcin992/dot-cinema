'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Timesheet', {
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
      allowNull: true
    }

  }, {
    underscored: true,
    tableName: 'timesheets'
  });
};
