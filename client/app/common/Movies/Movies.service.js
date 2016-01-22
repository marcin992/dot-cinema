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
        return ApiRequester.getData(tableNames.movies, {
          where: {
            _id: id
          }
        }).then(movies => {
          return _.first(movies);
        });
      },

      getPremieres: function() {
        return this.getMovies().then(movies => {
          return _.chain(movies).filter(movie => {
            return !!movie.cover;
          }).sample(4).value();
        });

      }


    }
  });
