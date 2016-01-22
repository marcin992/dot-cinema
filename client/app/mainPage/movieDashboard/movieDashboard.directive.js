'use strict';

angular.module('dotCinemaApp')
  .directive('movieDashboard', function (Movies) {
    return {
      templateUrl: 'app/mainPage/movieDashboard/movieDashboard.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.movies = [];
        scope.mainMovie = {};
        scope.otherMovies = {};
        Movies.getPremieres().then(movies => {
          scope.movies = movies;
          scope.mainMovie = scope.movies[0];
          scope.otherMovies = scope.movies.slice(1);
        });

      }
    };
  });
