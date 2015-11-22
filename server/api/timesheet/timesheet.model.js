'use strict';
import {User} from '../../sqldb/index';

module.exports = function(sequelize, DataTypes) {
  var TimeSheet = sequelize.define('TimeSheet', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    data_create: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    data_end: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    session: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    TimeSheet.hasOne(User, {
      foreign_key: 'userid'
    });

  }

  return TimeSheet;
};