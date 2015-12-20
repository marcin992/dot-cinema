'use strict';

angular.module('dotCinemaApp')
  .factory('ApiRequester', function ($http) {
    var url = 'api/';

    return {
      getData: function (table, filtering) {
        filtering = filtering || {where: {}};
        return $http.post(url + table, JSON.stringify(filtering))
          .then(function(result) {
            return result.data
          });
      },

      createEntity: function(table, object) {
        return $http.post(url + table + '/create', JSON.stringify(object))
          .then(function(result) {
            return result.data;
          });
      },

      editData: function (table, object) {
        filtering = filtering || {where: {}};
        return $http.put(url + table, JSON.stringify(object))
          .then(function(result) {
            return result.data
          });
      },

      deleteData: function (table, filtering) {
        filtering = filtering || {where: {}};
        return $http.delete(url + table, JSON.stringify(filtering))
          .then(function(result) {
            return result.data
          });
      }
    };
  });
