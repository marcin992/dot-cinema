'use strict';

angular.module('dotCinemaApp')
  .factory('SeansesAdminFactory', function (ApiRequester, TableNames) {
      var moviesTable = TableNames.getTableNames().movies;
      var hallsTable = TableNames.getTableNames().halls;
      var seansesTable = TableNames.getTableNames().seanses;

      var seansesAdminFactory = [];
      var movies = [];
      var seanses = [];
      var halls = [];

      seansesAdminFactory.getMovies = function(filtr) {
        ApiRequester.getData(moviesTable, filtr)
              .then(function (content) {
                movies = content;
              });

        return movies;
      },

      seansesAdminFactory.getHalls = function(filtr) {
        ApiRequester.getData(hallsTable, filtr)
              .then(function (content) {
                halls = content;
              });

        return halls;
      },

      seansesAdminFactory.getSeanses = function(filtr) {
        ApiRequester.getData(seansesTable, filtr)
              .then(function (seanse) {
                seanses = seanse;
              });

        return seanses;
      },

      seansesAdminFactory.addSeanse = function(newSeanse) {
        ApiRequester.createEntity(seansesTable, newSeanse)
              .then( function (seance) {
                seanses[0] = seanse;
              });

        return seanses[0]
      },

      seansesAdminFactory.editSeanse = function(seanse) {
        ApiRequester.editData(seansesTable, seanse)
              .then( function (seance) {
                seanses[0] = seanse;
              });

        return seanses[0]
      },

      seansesAdminFactory.deleteSeanse = function(seanse) {
        ApiRequester.deleteData(seansesTable, seanse)
              .then( function (seance) {
                seanses[0] = seanse;
              });

        return seanses[0]
      }

      return seansesAdminFactory;
  });
