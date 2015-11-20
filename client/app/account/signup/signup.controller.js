'use strict';

angular.module('dotCinemaApp')
  .controller('SignupCtrl', function($scope, Auth, $state, toastr) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.createUser({
          nick: $scope.user.nick,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
          // Account created, redirect to home
          $state.go('main');
        })
        .catch(function(err) {
          err = err.data;
          $scope.errors = {};
          toastr.error(err,message);

          // Update validity of form fields that match the sequelize errors
          if (err.name) {
            angular.forEach(err.fields, function(field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = err.message;
            });
          }
        });
      }
    };

  });
