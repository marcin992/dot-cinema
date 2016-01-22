'use strict';

angular.module('dotCinemaApp')
  .controller('ResetPasswordCtrl', function ($scope, $stateParams, $http, $state, toastr) {
    $scope.token = $stateParams.token;

    $http.post('api/users/reset', JSON.stringify({
      token: $scope.token
    })).then(function(data) {
      toastr.success('Zresetowano hasło. Dalsze wskazówki przyślemy na maila', 'Sukces');
      $state.go('main');
    })
  });
