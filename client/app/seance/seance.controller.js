'use strict';

angular.module('dotCinemaApp')
  .controller('SeanceCtrl', function ($scope, $stateParams, ApiRequester, TableNames) {
    var tableNames = TableNames.getTableNames();
    $scope.seanceId = $stateParams.seanceId;
    $scope.seance = {};
    $scope.selectedPlace = '';

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
