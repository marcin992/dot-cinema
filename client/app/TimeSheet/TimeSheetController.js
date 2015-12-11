'use strict';

angular.module('dotCinemaApp')
  .controller('TimeSheetController', function($scope, Timesheet, Auth) {
      var User = Auth.getCurrentUser();
      var Employer = User.employee_data;

      $scope.timesheets = new Array();
      $scope.timesheet = $scope.timesheets.length > 0 ? 
        $scope.timesheets[$scope.timesheets.length - 1] : {
            _id: "",
            date_start: "",
            date_end: "",
            employee_data_id: ""
        };

      $scope.errors = [];
        
      //Timesheet.GetAll()
      Timesheet.Gets(Employer)
      .success(function(timesheets) {
        $scope.timesheets = timesheets;
      })
      .error(function(error) {
        $scope.errors.push(error);
        console.log(error);
      });

      $scope.Start = function() {
        if ($scope.timesheet.date_end != "") { 
          $scope.timesheet = {};
     
          $scope.timesheet._id = "";
          $scope.timesheet.date_start = Timesheet.GetDateNow();
          $scope.timesheet.date_end = "";
          $scope.timesheet.employee_data_id = 1;
          
          Timesheet.Start($scope.timesheet)
          .success(
            function(data) {
              $scope.timesheets.push($scope.timesheet);
            })
          .error(function(error) {
            $scope.errors.push(error);
            console.log('Error: ' + error);
          });
        }
      };

      $scope.End = function() {
        if ($scope.timesheet.date_end == "") {
          $scope.timesheet = Timesheet.GetDateNow();
          $scope.timesheet = $scope.timesheets[$scope.timesheets.length - 1];
                    
          Timesheet.End($scope.timesheet)
          .success(
            function(data) {
              $scope.timesheets.push($scope.timesheet);
            })
          .error(function(error) {
            $scope.errors.push(error);
            console.log('Error: ' + error);
          });
        }
      };

      $scope.DateEndIsNull = function() {
          var d = $scope.timesheet.date_end != "" ? true : false;
          return d;
      };
  });
