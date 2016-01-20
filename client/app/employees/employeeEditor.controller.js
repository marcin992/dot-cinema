'use strict';

angular.module('dotCinemaApp')
  .controller('EmployeeEditorCtrl', function($scope, row) {
    $scope.row = row;
  });
