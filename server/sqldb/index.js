/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(config.sequelize.dbName, config.sequelize.dbUser,
    config.sequelize.dbPassword, config.sequelize.options)
};

// Insert models below
db.Schedule = db.sequelize.import('../api/Schedule/Schedule.model');
db.Timesheet = db.sequelize.import('../api/timesheet/timesheet.model');
db.Rating = db.sequelize.import('../api/rating/rating.model');
db.Reservation = db.sequelize.import('../api/reservation/reservation.model');
db.Hall = db.sequelize.import('../api/hall/hall.model');
db.Seance = db.sequelize.import('../api/seance/seance.model');
db.Movie = db.sequelize.import('../api/movie/movie.model');
db.EmployeesData = db.sequelize.import('../api/employeesData/employeesData.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

db.User.hasOne(db.EmployeesData, {
  foreignKey: 'user_id',
  as: 'employee_data'
});

db.EmployeesData.hasMany(db.Schedule, {
  foreignKey: 'employee_id',
  as: 'Schedules'
});

db.Schedule.belongsTo(db.EmployeesData, {
  foreignKey: 'employee_id',
  as: 'employee_data'
});

db.Movie.hasMany(db.Seance, {
  foreignKey: 'movie_id',
  as: 'seances'
});

db.Seance.belongsTo(db.Movie, {
  foreignKey: 'movie_id',
  as: 'movie'
});

db.Seance.belongsTo(db.Hall, {
  foreignKey: 'hall_id',
  as: 'hall'
});

db.Hall.hasMany(db.Seance, {
  foreignKey: 'hall_id',
  as: 'seances'
});

db.Reservation.belongsTo(db.Seance, {
  foreignKey: 'seance_id',
  as: 'seance'
});

db.User.hasMany(db.Reservation, {
  foreignKey: 'user_id',
  as: 'reservations'
});

db.Movie.hasMany(db.Rating, {
  foreignKey: 'movie_id',
  as: 'ratings'
});

db.Rating.belongsTo(db.Movie, {
  foreignKey: 'movie_id',
  as: 'movie'
});

db.User.hasMany(db.Rating, {
  foreignKey: 'user_id',
  as: 'ratings'
});

db.Rating.belongsTo(db.User, {
  foreignKey: 'user_id',
  as: 'user'
});

db.EmployeesData.hasMany(db.Timesheet, {
  foreignKey: 'employee_data_id',
  as: 'timesheets'
});

db.Timesheet.belongsTo(db.EmployeesData, {
  foreignKey: 'employee_data_id',
  as: 'employee_data'
});

db.sequelize.sync({
  force: false
});
module.exports = db;
