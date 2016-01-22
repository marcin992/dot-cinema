'use strict';

angular.module('dotCinemaApp')
  .controller('NavbarCtrl', function ($scope, Auth) {
    $scope.menu = [{
      title: 'Zarządzaj pracownikami',
      state: 'employees',
      condition: Auth.isManager()
    }, {
      title: 'Filmy',
      state: 'movieList',
      condition: Auth.isCinemaSetter()
    }, {
      title: 'Seanse',
      state: 'SeancesAdmin',
      condition: Auth.isCinemaSetter()
    }, {
      title: 'Sale',
      state: 'HallsAdmin',
      condition: Auth.isCinemaSetter()
    }, {
      title: 'Rezerwacje',
      state: 'reservations',
      condition: Auth.isEmployee()
    }, {
      title: 'divider',
      condition: true
    }, {
      title: 'Logowanie godzin',
      state: 'Timesheet',
      condition: Auth.isEmployee()
    }, {
      title: 'Mój profil',
      state: 'profile',
      condition: Auth.isLoggedIn()
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = Auth.getCurrentUser();
  });
