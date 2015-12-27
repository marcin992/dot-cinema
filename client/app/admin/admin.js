'use strict';

angular.module('dotCinemaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .state('SeancesAdmin', {
        url: '/Admin/Seances',
        templateUrl: 'app/admin/Seances/SeancesAdmin.html',
        controller: 'SeancesAdminController'
      });
  });
