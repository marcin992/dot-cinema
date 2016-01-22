'use strict';

angular.module('dotCinemaApp')
  .directive('reservationInfo', function () {
    return {
      templateUrl: 'app/common/reservationInfo/reservationInfo.html',
      restrict: 'EA',
      scope: {
        reservation: '=',
        role: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });
