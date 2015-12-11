'use strict';

angular.module('dotCinemaApp')
  .controller('TimeSheetController', function($scope, Timesheet, Auth) {
      //$scope.errors = {};
      
      var User = Auth.getCurrentUser();
      var Employer = User.employee_data;

      $scope.timesheets = new Array();

      Timesheet.GetAll()
      .success(function(timesheets) {
        $scope.timesheets = timesheets;
        console.log($scope.timesheets);
      });

  });
