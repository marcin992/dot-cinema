'use strict';

angular.module('dotCinemaApp')
  .directive('movieCarousel', function () {
    return {
      templateUrl: 'app/movieCarousel/movieCarousel.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.movies = [
          "http://www.007.com/wp-content/uploads/2015/03/UK-Quad-Mono-72dpi.jpg",
          "http://www.thefilmgrapevine.com/wp-content/uploads/2014/11/Interstellar-3.jpg"
        ]
      }
    };
  });
