'use strict';

angular.module('dotCinemaApp')
  .controller('MoviesCtrl', function ($scope, $stateParams, ApiRequester, TableNames) {
    var tableNames = TableNames.getTableNames();
    $scope.movie = {};
    $scope.movieId = $stateParams.movieId;

    ApiRequester.getData(tableNames.movies, {
      where: {
        _id: $scope.movieId
      }
    }).then(function(movie) {
      $scope.movie = _.first(movie);
    });

  });
