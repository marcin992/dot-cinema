'use strict';

angular.module('dotCinemaApp')
  .controller('ReservationsCtrl', function ($scope, Reservations, Auth) {
    $scope.reservation = null;
    $scope.submitted = false;
    $scope.hasAccess = Auth.isEmployee();

    $scope.findReservation = function(reservationCode) {
      $scope.submitted = true;
      return Reservations.findReservation(reservationCode)
        .then(reservation => {
          $scope.reservation = _.first(reservation);
        });
    };
  });
