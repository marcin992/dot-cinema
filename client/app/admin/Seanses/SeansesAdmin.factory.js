'use strict';

angular.module('dotCinemaApp')
  .factory('SeansesAdminFactory', function (ApiRequester, TableNames) {
      var moviesTable = TableNames.getTableNames().movies;
      var hallsTable = TableNames.getTableNames().halls;
      var seansesTable = TableNames.getTableNames().seanses;

      var seansesAdminFactory = [];
      var toReturn = [];

      seansesAdminFactory.getMovies = function(filtr) {
        ApiRequester.getData(moviesTable, filtr)
              .then(function (movies) {
                toReturn = movies;
              });

        return toReturn;
      },

      seansesAdminFactory.getHalls = function(filtr) {
        ApiRequester.getData(hallsTable, filtr)
              .then(function (halls) {
                toReturn = halls;
              });

        return toReturn;
      },

      seansesAdminFactory.getSeanses = function(filtr) {
        ApiRequester.getData(seansesTable, filtr)
              .then(function (seanse) {
                toReturn[0] = seanse;
              });

        return toReturn[0];
      },

      seansesAdminFactory.addSeanse = function(newSeanse) {
        ApiRequester.createEntity(seanse, newSeanse)
              .then( function (seance) {
                toReturn[0] = seanse;
              });

        return toReturn[0]
      },

      seansesAdminFactory.editSeanse = function(seanse) {
        ApiRequester.editData(seanse, seanse)
              .then( function (seance) {
                toReturn[0] = seanse;
              });

        return toReturn[0]
      },

      seansesAdminFactory.deleteSeanse = function(seanse) {
        ApiRequester.deleteData(seanse, seanse)
              .then( function (seance) {
                toReturn[0] = seanse;
              });

        return toReturn[0]
      }

      return seansesAdminFactory;
  });
