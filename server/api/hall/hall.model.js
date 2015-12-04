'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Hall', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    chairs: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    underscored: true,
    tableName: 'halls'
  });
};
