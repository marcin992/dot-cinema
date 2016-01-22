'use strict';

angular.module('dotCinemaApp')
  .controller('UserMovieListCtrl', function ($scope, Movies) {
    $scope.movies = [];

    Movies.getMovies()
      .then(movies => {
        $scope.movies = movies;
      });
  });
