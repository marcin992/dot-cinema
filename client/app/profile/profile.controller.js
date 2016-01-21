'use strict';

angular.module('dotCinemaApp')
  .controller('ProfileCtrl', function ($scope, Reservations, Auth, Employees) {
    $scope.reservations = [];
    $scope.user = Auth.getCurrentUser();
    $scope.isEmployee = Auth.isEmployee;
    $scope.columns = Employees.getColumns();

    Reservations.getUsersReservations()
      .then(function(reservations) {
        $scope.reservations = _.map(reservations, function(reservation) {
          return _.merge(reservation, {
            seance: {
              preetyDate: moment(reservation.seance.date).format('DD MMMM'),
              hour: moment(reservation.seance.date).format('HH:mm')
            }
          });
        });
      });
  });
