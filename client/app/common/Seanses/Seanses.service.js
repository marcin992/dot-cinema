'use strict';

angular.module('dotCinemaApp')
  .factory('Seanses', function () {
    var seanses = [{
      id: 1,
      dateStart: new Date(2015, 11, 11, 15, 0),
      time: 120,
      movie: {
        id: 1,
        name: 'Spectre',
        description: 'srata tata',
        image: 'http://www.007.com/wp-content/uploads/2015/03/UK-Quad-Mono-72dpi.jpg'
      },
      hall: 3
    }];

    return {
      getSeanses: function(query) {
        return query ? _.findWhere(seanses, query) : seanses;
      }
    }
  });
