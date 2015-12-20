'use strict';

angular.module('dotCinemaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .state('SeansesAdmin', {
        url: '/Admin/Seanses',
        templateUrl: 'app/admin/Seanses/SeansesAdmin.html',
        controller: 'SeansesAdminController'
      });
  });
