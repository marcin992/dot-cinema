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
      }
    };
  });
