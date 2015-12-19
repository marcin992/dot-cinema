'use strict';

angular.module('dotCinemaApp')
  .directive('placeSelect', function () {
    return {
      templateUrl: 'app/placeSelect/placeSelect.html',
      restrict: 'EA',
      scope: {
        seance: '=',
        selectedPlace: '='
      },
      link: function (scope, element, attrs) {
        scope.selectPlace = function(row, column) {
          scope.selectedPlace = row + column;
        };
      }
    };
  });
