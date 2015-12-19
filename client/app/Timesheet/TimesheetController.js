'use strict';

angular.module('dotCinemaApp')
  .controller('TimesheetController', function($scope, Auth, Timesheet, DateFactory) {
      var User = Auth.getCurrentUser();

      $scope.timesheets = new Array();

      $scope.errors = [];

      $scope.loaded = false;
      $scope.showWorkerName = false;
      $scope.empty = false;
      $scope.readonly = false;
      $scope.loaded = true;

      var Employer = User.employee_data;
        
      $scope.init = function() {
        Employer = User.employee_data;
        if (Employer != undefined && Employer._id != undefined) {
          Timesheet.Gets(Employer)
          .success(function(timesheets) {
            $scope.timesheets = getTimesheetViews(timesheets);
            initTimesheet(timesheets[timesheets.length - 1]);

            $scope.empty = dateEndIsNull();
            $scope.loaded = false;
          })
          .error(function(error) {
            $scope.errors.push(error);
            console.log(error);
          });
        }
        else {
          initTimesheet(null);
          $scope.loaded = false;
        }
      };

      $scope.getAll = function() {
          Timesheet.GetAll()
          .success(function(timesheets) {
            $scope.timesheets = timesheets;
            initTimesheet();
          })
          .error(function(error) {
            $scope.errors.push(error);
            console.log(error);
          });
      }

      function initTimesheet(ts) {
        $scope.timesheet = $scope.timesheets.length > 0 ? 
        ts : {
            _id: "",
            date_start: "",
            date_end: "",
            employee_data_id: ""
        };
      }

      $scope.start = function() {
        if ($scope.timesheet.date_end != "" || $scope.timesheets.length == 0) { 
          $scope.timesheet = {
            date_start: DateFactory.GetDateNow(),
            employee_data_id: (Employer != undefined 
              ? Employer._id 
              : 1)
          };
               
          Timesheet.Start($scope.timesheet)
          .success(
            function(data) {
              $scope.timesheet = data;
              $scope.timesheets.push(getTimesheetView($scope.timesheet));
              $scope.empty = dateEndIsNull();
            })
          .error(function(error) {
            $scope.errors.push(error);
            console.log(error);
          });
        }
      };

      $scope.end = function() {
        if ($scope.timesheet.date_end == null) {
          $scope.timesheet.date_end = DateFactory.GetDateNow();                    
          $scope.timesheets[$scope.timesheets.length - 1] = getTimesheetView($scope.timesheet);

          Timesheet.Update($scope.timesheet)
          .success(function(error) {
            $scope.empty = dateEndIsNull();
          })
          .error(function(error) {
            $scope.errors.push(error);
            console.log('Error: ' + error);
          });
        }
      };

      function dateEndIsNull() {
          if ($scope.timesheet.date_end != "" 
            && $scope.timesheet.date_end != null
            && $scope.timesheet.date_end != undefined) {
              return false;
          }

          return true;
      };
  });