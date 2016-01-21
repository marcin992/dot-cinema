'use strict';

angular.module('dotCinemaApp')
  .controller('ProfileCtrl', function ($scope, Reservations, Auth, Employees, Upload, toastr) {
    $scope.reservations = [];
    $scope.user = Auth.getCurrentUser();
    $scope.isEmployee = Auth.isEmployee;
    $scope.columns = Employees.getColumns();
    $scope.newAvatar = false;

    $scope.upload = function(file) {
      file.upload = Upload.upload({
        url: 'api/users/' + $scope.user._id + '/avatar',
        data: {
          file: file
        }
      });
      $scope.newAvatar = false;
    };

    $scope.changeAvatar = function(form) {
      if(form.avatar.$error.pattern) {
        return toastr.error('Nieobsługiwany format pliku.', 'Błąd');
      }
      $scope.newAvatar = true;
    };

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
