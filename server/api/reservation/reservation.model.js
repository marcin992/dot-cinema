'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Reservation', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    chair: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
    tableName: 'reservations'
  });
};
