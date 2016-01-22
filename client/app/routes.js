'use strict';

angular.module('dotCinemaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/mainPage/main/main.html',
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
        templateUrl: 'app/account/profile/profile.html'
      })
      .state('movies', {
        url: '/movies/:movieId',
        controller: 'MoviesCtrl',
        templateUrl: 'app/movies/movies.html'
      })
      .state('employees', {
        url: '/employees',
        templateUrl: 'app/employees/employees.html',
        controller: 'EmployeesCtrl'
      })
      .state('passwordChange', {
        url: '/passwordChange',
        templateUrl: 'app/account/passwordChange/passwordChange.html',
        controller: 'PasswordChangeCtrl'
      })
      .state('movieList', {
        url: '/movieList',
        templateUrl: 'app/movieList/movieList.html',
        controller: 'MovieListCtrl'
      })
      .state('reservations', {
        url: '/reservations',
        templateUrl: 'app/reservations/reservations.html',
        controller: 'ReservationsCtrl'
      })
      .state('successReservation', {
        url: '/reservation/:reservationId',
        templateUrl: 'app/successReservation/successReservation.html',
        controller: 'SuccessReservationCtrl'
      })
      .state('userMovieList', {
        url: '/userMovieList',
        templateUrl: 'app/userMovieList/userMovieList.html',
        controller: 'UserMovieListCtrl'
      })
      .state('seancesList', {
        url: '/seancesList/:movieId',
        templateUrl: 'app/seancesList/seancesList.html',
        controller: 'SeancesListCtrl'
      })
      .state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'app/account/forgotPassword/forgotPassword.html',
        controller: 'ForgotPasswordCtrl'
      })
      .state('resetPassword', {
        url: '/reset/:token',
        templateUrl: 'app/account/resetPassword/resetPassword.html',
        controller: 'ResetPasswordCtrl'
      });
  });
