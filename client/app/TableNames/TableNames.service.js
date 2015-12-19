'use strict';

angular.module('dotCinemaApp')
  .factory('TableNames', function () {

    var tableNames = {
      employee_data: 'employee_data',
      halls: 'halls',
      movies: 'movies',
      ratings: 'ratings',
      reservations: 'reservations',
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
