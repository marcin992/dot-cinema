'use strict';

angular.module('dotCinemaApp')
  .directive('crudList', function ($state) {
    return {
      templateUrl: 'app/common/crudList/crudList.html',
      restrict: 'EA',
      scope: {
        data: '=',
        columns: '=',
        onUpdate: '&',
        onDelete: '&',
        deleteCondition: '=',
        onSelect: '&?',
        customActions: '=?'
      },
      link: function (scope, element, attrs) {
        scope.sortType = null;
        scope.sortReverse = false;

        scope.changeSorting = function(column) {
          scope.sortType = column.dbName;
          scope.sortReverse = !scope.sortReverse;
        };

        scope.goto = function(state, param, row) {
          var config = {};
          config[param] = row._id;
          $state.go(state, config);
        };
      }
    };
  });
