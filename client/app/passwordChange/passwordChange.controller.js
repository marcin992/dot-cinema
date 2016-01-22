'use strict';

angular.module('dotCinemaApp')
  .controller('PasswordChangeCtrl', function ($scope, Auth, toastr, $state) {
    $scope.hasAccess = Auth.isLoggedIn();
    $scope.user = {
      oldPassword: '',
      newPassword: ''
    };
    $scope.submit = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(() => {
            toastr.success('Zmiana hasła zakończona sukcesem.', 'Sukces');
            $state.go('profile');
          }, (err) => {
            $scope.passwordIncorrect = true;
          });
      }
    };
  });
