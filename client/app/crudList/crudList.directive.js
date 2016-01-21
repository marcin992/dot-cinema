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
        scope.sortType = null;
        scope.sortReverse = false;

        scope.changeSorting = function(column) {
          scope.sortType = column.dbName;
          scope.sortReverse = !scope.sortReverse;
        }
      }
    };
  });
