'use strict';

angular.module('dotCinemaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('Timesheet', {
        url: '/Timesheet',
        templateUrl: 'app/Timesheet/Timesheet.html',
        controller: 'TimesheetController'
      })
      .state('TimesheetByEmployer', {
        url: '/Timesheet/:ID',
        templateUrl: 'app/Timesheet/Timesheet.html',
        controller: 'TimesheetController'
      });
  });
