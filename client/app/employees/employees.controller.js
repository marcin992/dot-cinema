'use strict';

angular.module('dotCinemaApp')
  .controller('EmployeesCtrl', function ($scope, Employees, $modal, TableNames) {

    $scope.employees = [];

    $scope.columns = [{
      dbName: 'name',
      guiName: 'Imię',
      type: 'text'
    }, {
      dbName: 'surname',
      guiName: 'Nazwisko',
      type: 'text'
    }, {
      dbName: 'pesel',
      guiName: 'PESEL',
      type: 'text'
    }, {
      dbName: 'role',
      guiName: 'Uprawnienia',
      type: 'text',
      customValue: function(row) {
        return row.user.role;
      }
    }];

    $scope.update = function(employee) {
      return Employees.updateEmployee(employee);
    };

    $scope.delete = function(employee) {
      return Employees.deleteEmployee(employee._id);
    };

    $scope.create = function() {

    };

    $scope.select = function(row) {
      var modalInstance = $modal.open({
        templateUrl: 'app/employees/employeeEditor.html',
        controller: 'EmployeeEditorCtrl',
        resolve: {
          row: function() {
            return row;
          }
        }
      });

      modalInstance.result.then(alert);
    };

    Employees.getEmployees().then(function(employees) {
      $scope.employees = employees;
    });


  });
