/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
import Q from 'q';
var Thing = sqldb.Thing;
var User = sqldb.User;
var EmployeesData = sqldb.EmployeesData;
var Movie = sqldb.Movie;
var Timesheet = sqldb.Timesheet;
var Rating = sqldb.Rating;
var Reservation = sqldb.Reservation;
var Hall = sqldb.Hall;
var Seance = sqldb.Seance;

Movie.destroy({
  where: {}
}).then(() => {
  return Seance.destroy({
    where: {}
  })
}).then(() => {
  return Hall.destroy({
    where: {}
  })
}).then(() => {
  return Reservation.destroy({
    where: {}
  })
}).then(() => {
  return Movie.create({
    title: 'Star Wars',
    duration: 180
  });
}).then(movie => {
  return Seance.create({
    date: Date.now(),
    cost: 14.00,
    movie_id: movie.get('_id')
  });
}).then(seance => {

  return Hall.create({
    name: 'A1',
      chairs: {
        A: 25,
        B: 25,
        C: 25,
        D: 25,
        E: 20
      }
  });
}).then(hall => {
  return Seance.update({
    hall_id: hall.get('_id')
  }, {
    where: {
      cost: 14.00
    }
  });
});

