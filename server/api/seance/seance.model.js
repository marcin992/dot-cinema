'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Seance', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    underscored: true,
    tableName: 'seances'
  });
};
