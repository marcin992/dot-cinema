'use strict';

angular.module('dotCinemaApp')
  .factory('RoleHierarchy', function () {
    return {
      getRoleHierarchy: function() {
        return {
          admin: ['cinema_setter', 'manager', 'employee', 'user'],
          manager: ['cinema_setter', 'employee', 'user'],
          cinema_setter: ['employee', 'user'],
          employee: ['user'],
          user: []
        }
      }
    };
  });
