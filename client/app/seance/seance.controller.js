'use strict';

angular.module('dotCinemaApp')
  .controller('SeanceCtrl', function ($scope, $stateParams, ApiRequester, TableNames, Reservations, $state, Auth) {
    var tableNames = TableNames.getTableNames();
    $scope.seanceId = $stateParams.seanceId;
    $scope.seance = {};
    $scope.selectedPlace = '';

    $scope.createReservation = function() {
      var newReservation = {
        chair: $scope.selectedPlace,
        seance_id: $scope.seanceId
      };
      return Reservations.createReservation(newReservation)
        .then(function(res) {
          alert('Zarezerwowano miejsce!');
          $state.go('main');
        })
    };

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
