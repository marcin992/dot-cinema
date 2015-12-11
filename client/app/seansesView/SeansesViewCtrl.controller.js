'use strict';

angular.module('dotCinemaApp')
  .controller('SeansesViewCtrl', function ($scope, ApiRequester, TableNames) {
    var tableNames = TableNames.getTableNames();
    $scope.seances = [];
    $scope.movies = [];

    ApiRequester.getData(tableNames.movies)
      .then(function(movies) {
        $scope.movies = movies;
      });
  });
