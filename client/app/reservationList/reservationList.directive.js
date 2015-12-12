'use strict';

angular.module('dotCinemaApp')
  .directive('reservationList', function () {
    return {
      templateUrl: 'app/reservationList/reservationList.html',
      restrict: 'EA',
      scope: {
        reservations: '='
      },
      link: function (scope, element, attrs) {
        scope.isPast = function(reservation) {
          return moment() > moment(reservation.seance.date);
        };
      }
    };
  });
