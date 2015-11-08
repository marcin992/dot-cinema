'use strict';

angular.module('dotCinemaApp')
  .directive('movieDashboard', function (Movies) {
    return {
      templateUrl: 'app/movieDashboard/movieDashboard.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        var movies = Movies.getPremieres();

        scope.mainMovie = movies[0];
        scope.otherMovies = movies.slice(1);
      }
    };
  });
