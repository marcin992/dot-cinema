'use strict';

angular.module('dotCinemaApp')
  .factory('TableNames', function () {

    var tableNames = {
      employee_data: 'employees-data',
      halls: 'halls',
      movies: 'movies',
      ratings: 'ratings',
      reservations: 'reservations',
      schedule: "schedules",
      seances: 'seances',
      timesheets: 'timesheets',
      users: 'users'
    };

    return {
      getTableNames: function () {
        return tableNames;
      }
    };
  });
