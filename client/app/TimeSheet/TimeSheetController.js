'use strict';

angular.module('dotCinemaApp')
  .controller('TimeSheetController', function($scope, $http, Auth) {
      $scope.errors = {};
      
      var User = Auth.getCurrentUser();
      $scope.Employer = User.employee_data;
      $scope.timesheets = [];

      $http.get('/api/timesheets/')
        .success(function(data, status, headers, config) {
          $scope.timesheets = data;
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

      setTimeout(function () {
        console.log($scope.timesheets);  

      }, 5000);
  });
