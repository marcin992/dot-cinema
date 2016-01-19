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

      seancesAdminFactory.getMovies = function(filtr, callback) {
        ApiRequester.getData(moviesTable, filtr)
              .then(function (content) {
                callback(content);
              });
      },

      seancesAdminFactory.getHalls = function(filtr, callback) {
        ApiRequester.getData(hallsTable, filtr)
              .then(function (content) {
                callback(content);
              });
      },

      seancesAdminFactory.getSeances = function(filtr, callback) {
        ApiRequester.getData(seancesTable, filtr)
              .then(function (content) {
                callback(content);
              });
      },

      seancesAdminFactory.addSeance = function(newSeance, callback) {
        ApiRequester.createEntity(seancesTable, newSeance)
              .then( function (content) {
                callback(content);
              });
      },

      seancesAdminFactory.editSeance = function(seance, callback) {
        ApiRequester.editData(seancesTable, seance)
              .then( function (content) {
                callback(content);
              });
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
