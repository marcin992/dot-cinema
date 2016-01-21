'use strict';

angular.module('dotCinemaApp')
  .factory('Employees', function (ApiRequester, TableNames) {
    var tableNames = TableNames.getTableNames();

    var columns = [{
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

    return {
      getColumns: function() {
        return columns;
      },
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
