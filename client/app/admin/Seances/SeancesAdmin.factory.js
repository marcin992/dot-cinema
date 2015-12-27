'use strict';

angular.module('dotCinemaApp')
  .factory('SeancesAdminFactory', function (ApiRequester, TableNames) {
      var moviesTable = TableNames.getTableNames().movies;
      var hallsTable = TableNames.getTableNames().halls;
      var seancesTable = TableNames.getTableNames().seances;

      var seancesAdminFactory = [];
      var movies = [];
      var seances = [];
      var halls = [];

      seancesAdminFactory.getMovies = function(filtr) {
        ApiRequester.getData(moviesTable, filtr)
              .then(function (content) {
                movies = content;
              });

        return movies;
      },

      seancesAdminFactory.getHalls = function(filtr) {
        ApiRequester.getData(hallsTable, filtr)
              .then(function (content) {
                halls = content;
              });

        return halls;
      },

      seancesAdminFactory.getSeances = function(filtr) {
        ApiRequester.getData(seancesTable, filtr)
              .then(function (seance) {
                seances = seance;
              });

        return seances;
      },

      seancesAdminFactory.addSeance = function(newSeance) {
        ApiRequester.createEntity(seancesTable, newSeance)
              .then( function (seance) {
                seances[0] = seance;
              });

        return seances[0]
      },

      seancesAdminFactory.editSeance = function(seance) {
        ApiRequester.editData(seancesTable, seance)
              .then( function (seance) {
                seances[0] = seance;
              });

        return seances[0]
      },

      seancesAdminFactory.deleteSeance = function(seance) {
        ApiRequester.deleteData(seancesTable, seance)
              .then( function (seance) {
                seances[0] = seance;
              });

        return seances[0]
      }

      return seancesAdminFactory;
  });
