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
        return $http.put(url + table + "/" + object._id, JSON.stringify(object))
          .then(function(result) {
            return result.data
          });
      },

      deleteData: function (table, id) {
        if (isNaN(id)) {
          id = id._id;
        }
        
        return $http.delete(url + table + "/" + id)
          .then(function(result) {
            return result.data
          });
      }
    };
  });
