'use strict';

angular.module('dotCinemaApp')
  .directive('movieDashboard', function (Movies, $interval) {
    return {
      templateUrl: 'app/mainPage/movieDashboard/movieDashboard.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.movies = [];
        scope.mainMovie = {};
        scope.otherMovies = {};

        var swap = function(x) {return x;};

        $interval(function() {
          var tmp = scope.otherMovies[0];
          scope.otherMovies.push(scope.mainMovie);
          scope.mainMovie = scope.otherMovies[0];
          scope.otherMovies = scope.otherMovies.slice(1);
        }, 20000);

        Movies.getPremieres().then(movies => {
          scope.movies = movies;
          scope.mainMovie = scope.movies[0];
          scope.otherMovies = scope.movies.slice(1);
        });

      }
    };
  });
