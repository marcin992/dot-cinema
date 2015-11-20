'use strict';

angular.module('dotCinemaApp')
  .controller('LoginCtrl', function($scope, Auth, $state, toastr) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
          // Logged in, redirect to home
          $state.go('main');
        })
        .catch(function(err) {
          toastr.error(err.message, 'Błąd');
          $scope.errors.other = err.message;
        });
      }
    };

  });
