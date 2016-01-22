'use strict';

angular.module('dotCinemaApp')
  .controller('MovieListCtrl', function ($scope, Movies, $modal, Upload, Auth) {
    $scope.movies = [];
    $scope.columns = Movies.getColumns();

    $scope.deleteCondition = Auth.isCinemaSetter();

    $scope.update = function(row) {
      return Movies.updateMovie(row);
    };

    $scope.delete = function(row) {
      return Movies.deleteMovie(row._id)
        .then((result) => {
          return Movies.getMovies();
        }).then((movies) => {
          $scope.movies = movies;
        });
    };

    $scope.select = function(row) {
      var modalInstance = $modal.open({
        templateUrl: 'app/movieList/movieCreator.html',
        controller: 'MovieCreatorCtrl',
        resolve: {
          row: function() {
            return row;
          },
          columns: function() {
            return $scope.columns;
          },
          mode: function() {
            return 'update'
          }
        }
      });

      modalInstance.result.then(result => {
        return $scope.update(result);
      }).then(() => {
        return Movies.getMovies();
      }).then(movies => {
        $scope.movies = movies;
      });
    };

    $scope.create = function() {
      var modalInstance = $modal.open({
        templateUrl: 'app/movieList/movieCreator.html',
        controller: 'MovieCreatorCtrl',
        resolve: {
          row: function() {
            return {
              title: '',
              duration: 0,
              description: '',
              cover: ''
            };
          },
          columns: function() {
            return $scope.columns;
          },
          mode: function() {
            return 'create'
          }
        }
      });

      modalInstance.result.then(result => {
        return Movies.createMovie(result);
      }).then(() => {
        return Movies.getMovies();
      }).then(movies => {
        $scope.movies = movies;
      });
    };

    Movies.getMovies()
      .then((movies) => {
        $scope.movies = movies;
      });
  });
