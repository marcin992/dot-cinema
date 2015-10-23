'use strict';

angular.module('dotCinemaApp')
  .directive('seansesView', function (Seanses) {
    return {
      templateUrl: 'app/seansesView/seansesView.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      }
    };
  });
