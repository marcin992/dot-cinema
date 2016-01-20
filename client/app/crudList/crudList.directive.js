'use strict';

angular.module('dotCinemaApp')
  .directive('crudList', function () {
    return {
      templateUrl: 'app/crudList/crudList.html',
      restrict: 'EA',
      scope: {
        data: '=',
        columns: '=',
        onUpdate: '&',
        onDelete: '&',
        onSelect: '&?'
      },
      link: function (scope, element, attrs) {
      }
    };
  });
