'use strict';

angular.module('dotCinemaApp')
  .controller('SeanceCtrl', function ($scope, $stateParams, ApiRequester, TableNames, Reservations, $state, toastr, Auth) {
    var tableNames = TableNames.getTableNames();
    $scope.seanceId = $stateParams.seanceId;
    $scope.seance = {};
    $scope.selectedPlace = '';
    $scope.reservations = [];
    $scope.hasAccess = Auth.isLoggedIn();

    if(!$scope.hasAccess) {
      $state.go('login');
    }

    $scope.createReservation = function(place) {
      if(place !== '') {
        var newReservation = {
          chair: place,
          seance_id: $scope.seanceId
        };
        return Reservations.createReservation(newReservation)
          .then(function(res) {
            toastr.success('Dokonano rezerwacji', 'Sukces');
            $state.go('successReservation', {
              reservationId: res._id
            });
          })
      }
    };

    ApiRequester.getData(tableNames.reservations, {
      where: {
        seance_id: $scope.seanceId
      }
    }).then(reservations => {
      $scope.reservations = reservations;
    });

    ApiRequester.getData(tableNames.seances, {
      where: {
        _id: $scope.seanceId
      }
    }).then(function(seance) {
      $scope.seance = _.first(seance);
      $scope.seance = _.merge($scope.seance, {
        preetyDate: moment($scope.seance.date).format('DD MMMM'),
        hour: moment($scope.seance.date).format('HH:mm')
      });
    });


  });
