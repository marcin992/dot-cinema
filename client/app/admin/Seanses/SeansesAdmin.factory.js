'use strict';

angular.module('dotCinemaApp')
  .factory('SeansesAdminFactory', function (ApiRequester, TableNames) {
      var moviesTable = TableNames.getTableNames().movies;
      var hallsTable = TableNames.getTableNames().halls;
      var seansesTable = TableNames.getTableNames().seanses;

      var seansesAdminFactory = [];
      var moviesList = [];
      var hallsList = [];

      seansesAdminFactory.getMovies = function(filtr) {
        ApiRequester.getData(moviesTable, filtr)
              .then(function (movies) {
                moviesList = movies;
              });

        return moviesList;
      },

      seansesAdminFactory.getHalls = function(filtr) {
        ApiRequester.getData(hallsTable, filtr)
              .then(function (halls) {
                hallsList = halls;
              });

        return hallsList;
      },

      seansesAdminFactory.getSeanses  = function(filtr) {
        return ApiRequester.getData(seansesTable, filtr);
      },

      seansesAdminFactory.addSeanse = function(newSeanse) {
        return ApiRequester.createEntity(seanse, newSeanse);
      },

      seansesAdminFactory.editSeanse = function(seanse) {
        return ApiRequester.editData(seanse, seanse);
      },

      seansesAdminFactory.deleteSeanse = function(seanse) {
        return ApiRequester.deleteData(seanse, seanse);
      }

      return seansesAdminFactory;
  });
