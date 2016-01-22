'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Movie', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    underscored: true,
    tableName: 'movies'
  });
};
