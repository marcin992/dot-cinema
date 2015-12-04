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
db.Seance = db.sequelize.import('../api/seance/seance.model');
db.Movie = db.sequelize.import('../api/movie/movie.model');
db.EmployeesData = db.sequelize.import('../api/employeesData/employeesData.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

db.User.hasOne(db.EmployeesData, {
  foreignKey: 'user_id',
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

db.sequelize.sync({
  force: true
});
module.exports = db;
