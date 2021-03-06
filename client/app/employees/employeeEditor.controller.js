'use strict';

angular.module('dotCinemaApp')
  .controller('EmployeeEditorCtrl', function($scope, row, mode, columns) {
    $scope.row = row;
    $scope.mode = mode;
    $scope.row.date_joined = new Date($scope.row.date_joined);
    $scope.row.date_out = $scope.row.date_out ? new Date($scope.row.date_out) : null;

    $scope.columns = columns;
    $scope.submitted = false;

    $scope.roles = ['admin', 'manager', 'cinema_setter', 'employee'];

    $scope.submit = function(row, form) {
      $scope.submitted = true;
      if(form.$valid) {
        $scope.$emit('userSave');
        $scope.$close(row);
      }
    }
  });
