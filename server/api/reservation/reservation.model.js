'use strict';

var createCode = function() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for( var i=0; i < 10; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

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
    },
    reservation_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    hooks: {
      beforeValidate: function(reservation) {
        reservation.reservation_code = createCode();
      }
    },
    underscored: true,
    tableName: 'reservations'
  });
};
