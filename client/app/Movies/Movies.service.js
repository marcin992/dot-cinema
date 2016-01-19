'use strict';

angular.module('dotCinemaApp')
  .factory('Movies', function () {
    var movies = [{
      id: 1,
      name: 'Spectre',
      //description: 'srata tata',
      image: 'http://www.007.com/wp-content/uploads/2015/03/UK-Quad-Mono-72dpi.jpg'
    }];


    return {
      getMovies: function() {
        return movies;
      },

      getMovie: function(id) {
        return _.findWhere(movies, {
          id: id
        });
      },

      getPremieres: function() {
        return [{
          id: 1,
          name: 'Spectre',
          //description: 'srata tata',
          image: 'http://static.srcdn.com/slir/w786-h393-q90-c786:393/wp-content/uploads/spectre-daniel-craig-monica-bellucci.jpg'
        }, {
          id: 2,
          name: 'Ugotowany',
          //description: 'srata tata',
          image: 'http://ars.pl/wp-content/uploads/2015/09/ugotowany-1.jpg'
        }, {
          id: 3,
          name: 'Gwiezdne Wojny',
          //description: 'srata tata',
          image: 'http://screencrush.com/files/2015/09/star-wars-force-awakens-banner-full.jpg'
        }, {
          id: 4,
          name: 'Marsjnin',
          //description: 'srata tata',
          image: 'http://moviesroom.pl/wp-content/uploads/2015/05/the-martian-01.jpg'
        }];
      }


    }
  });
