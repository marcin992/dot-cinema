'use strict';

angular.module('dotCinemaApp')
  .factory('Employees', function (ApiRequester, TableNames) {
    var tableNames = TableNames.getTableNames();

    return {
      getEmployees: function() {
        return ApiRequester.getData(tableNames.employee_data);
      },

      createEmployee: function(employee) {
        return ApiRequester.createEntity(tableNames.employee_data, employee);
      },

      updateEmployee: function(employee) {
        return ApiRequester.editData(tableNames.employee_data, employee);
      },

      deleteEmployee: function(employeeId) {
        return ApiRequester.deleteData(tableNames.employee_data, employeeId);
      }
    };
  });
