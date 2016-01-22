'use strict';

angular.module('dotCinemaApp')
  .factory('Movies', function (ApiRequester, TableNames) {

    var tableNames = TableNames.getTableNames();

    var columns = [{
      dbName: 'title',
      guiName: 'Tytuł',
      type: 'text',
      isRequired: true
    }, {
      dbName: 'duration',
      guiName: 'Czas trwania (w min.)',
      type: 'number',
      isRequired: true
    }, {
      dbName: 'description',
      guiName: 'Opis',
      type: 'textarea',
      isRequired: false
    }];

    return {
      getMovies: function() {
        return ApiRequester.getData(tableNames.movies);
      },

      getColumns: function() {
        return columns;
      },

      updateMovie: function(movie) {
        return ApiRequester.editData(tableNames.movies, movie);
      },

      deleteMovie: function(movieId) {
        return ApiRequester.deleteData(tableNames.movies, movieId);
      },

      createMovie: function(movie) {
        return ApiRequester.createEntity(tableNames.movies, movie);
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
