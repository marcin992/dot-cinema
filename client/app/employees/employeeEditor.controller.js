'use strict';

angular.module('dotCinemaApp')
  .controller('EmployeeEditorCtrl', function($scope, row, mode) {
    $scope.row = row;
    $scope.mode = mode;
    $scope.row.date_joined = new Date($scope.row.date_joined);
    $scope.row.date_out = $scope.row.date_out ? new Date($scope.row.date_out) : null;

    $scope.columns = [{
      dbName: 'name',
      guiName: 'Imię',
      type: 'text',
      isRequired: true
    }, {
      dbName: 'surname',
      guiName: 'Nazwisko',
      type: 'text',
      isRequired: true
    }, {
      dbName: 'pesel',
      guiName: 'PESEL',
      type: 'text',
      isRequired: false
    }, {
      dbName: 'phone',
      guiName: 'Telefon',
      type: 'text',
      isRequired: false
    }, {
      dbName: 'date_joined',
      guiName: 'Data zatrudnienia',
      type: 'date',
      isRequired: true
    }, {
      dbName: 'date_out',
      guiName: 'Data zwolnienia',
      type: 'date',
      isRequired: false
    }];

    $scope.roles = ['admin', 'manager', 'cinema_setter', 'employee'];

    $scope.submit = function(row) {
      $scope.$emit('userSave');
      $scope.$close(row);
    }
  });
