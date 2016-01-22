'use strict';

angular.module('dotCinemaApp')
  .controller('MovieCreatorCtrl', function ($scope, row, columns, mode, toastr, Upload) {
    $scope.row = row;
    $scope.columns = columns;
    $scope.mode = mode;

    console.log($scope.row);

    $scope.submit = function(row) {
      $scope.$emit('movieSave');
      $scope.$close(row);
    };

    $scope.isValid = function(form, name) {
      return form[name].$error.required;
    };

    $scope.upload = function(form, file) {
      if(!form.cover.$error.pattern) {
        file.upload = Upload.upload({
          url: 'api/movies/' + $scope.row._id + '/changeCover',
          data: {
            file: file
          }
        }).then(result => {
          row.cover = result.cover;
        });
      } else {
        return toastr.error('Nieobsługiwany format pliku.', 'Błąd');
      }
    }
  });
