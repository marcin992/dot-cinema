'use strict';

angular.module('dotCinemaApp')
  .controller('TimeSheetController', function($scope, Timesheet, Auth) {
      //$scope.errors = {};
      
      var User = Auth.getCurrentUser();
      var Employer = User.employee_data;

      $scope.timesheets = new Array();
      $scope.timesheet = $scope.timesheets.length > 0 ? 
        $scope.timesheets[$scope.timesheets.length - 1] : {
            date_start: "",
            date_end: "",
            employee_data_id: ""
        };
        
      Timesheet.GetAll()
      .success(function(timesheets) {
        $scope.timesheets = timesheets;
        console.log($scope.timesheets);
      });

      $scope.Start = function() {
        if ($scope.timesheet.date_end != "") { 
          $scope.timesheet = {};
     
          $scope.timesheet.date_start = Timesheet.GetDateNow();
          $scope.timesheet.date_end = "";
          $scope.timesheet.employee_data_id = 1;
          console.log($scope.timesheet);
          
          Timesheet.Start($scope.timesheet);
          $scope.timesheets.push($scope.timesheet);
        }
      };

      $scope.End = function() {
        if ($scope.timesheet.date_end == "") {
          $scope.timesheets[$scope.timesheets.length - 1].date_end = Timesheet.GetDateNow();
          $scope.timesheet = $scope.timesheets[$scope.timesheets.length - 1];
          console.log($scope.timesheet);
        }
      };

      $scope.DateEndIsNull = function() {
          return $scope.timesheet.date_end != "" ? true : false;
      };
  });
