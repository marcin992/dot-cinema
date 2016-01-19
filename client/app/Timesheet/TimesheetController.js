'use strict';

angular.module('dotCinemaApp')
  .controller('TimesheetController', function($scope, Auth, Timesheet, DateFactory, $stateParams, ApiRequester, TableNames) {
      var User = Auth.getCurrentUser();

      $scope.timesheets = new Array();

      $scope.errors = [];

      $scope.loaded = false;
      $scope.showWorkerName = false;
      $scope.empty = false;
      $scope.readonly = false;
      $scope.loaded = true;
      $scope.Employer = {};


      var Employer = {};

      function getProfile(callback) {
        callback(User.employee_data);
      }

      function getEmployerData(id, callback) {
        var where = { where: { _id: id } };
        ApiRequester.getData(TableNames.getTableNames().employee_data, where)
              .then(function (content) {
                callback(content);
              });
      }

      function downloadTs() {
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
      }
        
      $scope.init = function() {
        //try {
          if ($stateParams == undefined) { 
            getProfile(function(profile) { 
              Employer = profile;
              downloadTs();
              $scope.readonly = false;
            });
          }        
          else {
            if ($stateParams.ID == undefined) { 
              getProfile(function(profile) { 
                Employer = profile;
                downloadTs();
                $scope.readonly = false;
              });
            }        
            else {
              getEmployerData($stateParams.ID, function(profile) { 
                Employer = profile.length == 1 ? profile[0] : {};
                downloadTs();
                if(User.employee_data._id != $stateParams.ID) {
                  $scope.readonly = true;
                }

                if (Employer.name == undefined) {

                  Employer.name = "";
                  Employer.surname = "";
                }

                $scope.Employer = Employer;
              });
            }
          }
        },
        //catch(e) {
        //  getProfile(function(profile) { 
        //        Employer = profile;
          //      downloadTs();
           //     $scope.readonly = false;
            //  });
       // }

      $scope.getAll = function() {
          Timesheet.GetAll()
          .success(function(timesheets) {
            $scope.timesheets = getTimesheetViews(timesheets);
            initTimesheet(timesheets[timesheets.length - 1]);

            $scope.empty = dateEndIsNull();
            $scope.loaded = false;
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
  })
  .controller('TimesheetByEmployerController', function($scope, Auth, Timesheet, DateFactory) {
      var User = Auth.getCurrentUser();

      $scope.timesheets = new Array();

      $scope.errors = [];

      $scope.loaded = false;
      $scope.showWorkerName = false;
      $scope.empty = false;
      $scope.readonly = false;
      $scope.loaded = true;

      var Employer = {};

      function getProfile(callback) {
        callback(User.employee_data);
      }
        
      $scope.init = function() {
        getProfile(function(profile) { 
        Employer = profile;
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
        });
      };

      $scope.getAll = function() {
          Timesheet.GetAll()
          .success(function(timesheets) {
            $scope.timesheets = getTimesheetViews(timesheets);
            initTimesheet(timesheets[timesheets.length - 1]);

            $scope.empty = dateEndIsNull();
            $scope.loaded = false;
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
