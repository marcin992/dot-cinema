'use strict';

angular.module('dotCinemaApp')
  .controller('SuccessReservationCtrl', function ($scope, $stateParams, Reservations, Auth) {
    $scope.reservationId = $stateParams.reservationId;
    $scope.reservation = {};
    $scope.user = Auth.getCurrentUser();
    $scope.hasAccess = Auth.isLoggedIn();

    Reservations.getById($scope.reservationId)
      .then(reservation => {
        $scope.reservation = _.first(reservation)
      });

  });
