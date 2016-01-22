'use strict';

angular.module('dotCinemaApp')
  .controller('ForgotPasswordCtrl', function ($scope, $http, $state, toastr) {
    $scope.email = '';
    $scope.submit = function(form) {
      if (form.$valid) {
        $http.post('api/users/remindPassword', JSON.stringify({
          email: $scope.email
        })).then(result => {
          toastr.success('Wysłano zapytanie o zresetowanie hasła. Sprawdź maila', 'Info');
          $state.go('main');
        });
      }
    }
  });
