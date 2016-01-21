'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EmployeesData', {
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
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pesel: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: {
        msg: 'PESEL musi być unikalny'
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_joined: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_out: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    underscored: true,
    tableName: 'employee_data'
  });
};
