'use strict';

angular.module('dotCinemaApp')
  .directive('placeSelect', function () {
    return {
      templateUrl: 'app/placeSelect/placeSelect.html',
      restrict: 'EA',
      scope: {
        seance: '=',
        selectedPlace: '=',
        reservations: '='
      },
      link: function (scope, element, attrs) {
        scope.selectPlace = function(row, column) {
          if(!scope.placeTaken(row, column)) {
            scope.selectedPlace = row + column;
          }
        };

        scope.placeTaken = function(row, number) {
          return !!_.find(scope.reservations, reservation => {
            return reservation.chair === `${row}${number}`;
          })
        }
      }
    };
  });
