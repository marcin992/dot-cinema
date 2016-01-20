'use strict';

angular.module('dotCinemaApp')
  .controller('NavbarCtrl', function ($scope, Auth) {
    $scope.menu = [{
      'title': 'Strona główna',
      'state': 'main',
      condition: true
    }, {
      title: 'Zarządzaj pracownikami',
      state: 'employees',
      condition: Auth.isManager()
    }, {
      title: 'Mój profil',
      state: 'profile',
      condition: Auth.isLoggedIn()
    }, {
      title: 'Seanse',
      state: 'SeancesAdmin',
      condition: Auth.isCinemaSetter()
    }, {
      title: 'Sale',
      state: 'HallsAdmin',
      condition: Auth.isCinemaSetter()
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
