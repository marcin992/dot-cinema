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
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl',
        templateUrl: 'app/profile/profile.html'
      })
      .state('movies', {
        url: '/movies/:movieId',
        controller: 'MoviesCtrl',
        templateUrl: 'app/movies/movies.html'
      })
  });
