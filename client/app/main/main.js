'use strict';

angular.module('dotCinemaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('seance', {
        url: '/seance/:seanceId',
        templateUrl: 'app/seance/seance.html',
        controller: 'SeanceCtrl'
      });
  });
