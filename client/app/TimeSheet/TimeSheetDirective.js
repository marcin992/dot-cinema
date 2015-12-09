'use strict';

angular.module('dotCinemaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('TimeSheet', {
        url: '/TimeSheet',
        templateUrl: 'app/TimeSheet/TimeSheet.html',
        controller: 'AdminCtrl'
      });
  });
