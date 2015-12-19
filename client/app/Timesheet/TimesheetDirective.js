'use strict';

angular.module('dotCinemaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('Timesheet', {
        url: '/Timesheet',
        templateUrl: 'app/Timesheet/Timesheet.html',
        controller: 'TimesheetController'
      });
  });
