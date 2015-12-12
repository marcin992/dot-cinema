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
        
      $scope.Init = function() {
        if (Employer != undefined && Employer._id != undefined) {
          //Timesheet.GetAll()
          Timesheet.Gets(Employer)
          .success(function(timesheets) {
            $scope.timesheets = timesheets;
          })
          .error(function(error) {
            $scope.errors.push(error);
            console.log(error);
          });
        }
      };

      $scope.Start = function() {
        if ($scope.timesheet.date_end != "" || $scope.timesheets.length == 0) { 
          $scope.timesheet = {
            date_start: Timesheet.GetDateNow(),
            employee_data_id: (Employer != undefined 
              ? Employer._id 
              : 1)
          };
               
          Timesheet.Start($scope.timesheet)
          .success(
            function(data) {
              $scope.timesheet = data;
              $scope.timesheets.push($scope.timesheet);
            })
          .error(function(error) {
            $scope.errors.push(error);
            console.log(error);
          });
        }
      };

      $scope.End = function() {
        if ($scope.timesheet.date_end == null) {
          $scope.timesheet.date_end = Timesheet.GetDateNow();                    
          Timesheet.Update($scope.timesheet)
          .error(function(error) {
            $scope.errors.push(error);
            console.log('Error: ' + error);
          });
        }
      };

      $scope.DateEndIsNull = function() {
          if ($scope.timesheet.date_end != "" 
            && $scope.timesheet.date_end != null
            && $scope.timesheet.date_end != undefined) {
              return true;
          }

          return false;
      };
  });
