'use strict';

angular.module('dotCinemaApp')
  .controller('NavbarCtrl', function ($scope, Auth) {
    $scope.menu = [{
      'title': 'Strona główna',
      'state': 'main',
      condition: true
    }, {
      title: 'Mój profil',
      state: 'profile',
      condition: Auth.isLoggedIn()
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
