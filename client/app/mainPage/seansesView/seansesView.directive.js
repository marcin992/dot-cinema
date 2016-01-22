'use strict';

angular.module('dotCinemaApp')
  .directive('seansesView', function () {
    return {
      templateUrl: 'app/mainPage/seansesView/seansesView.html',
      restrict: 'EA',
      controller: 'SeansesViewCtrl',
      link: function (scope, element, attrs) {

      }
    };
  });
