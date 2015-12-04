'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rating', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    underscored: true,
    tableName: 'ratings'
  });
};
