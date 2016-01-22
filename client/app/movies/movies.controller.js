'use strict';

angular.module('dotCinemaApp')
  .controller('MoviesCtrl', function ($scope, $stateParams, ApiRequester, TableNames, Auth) {
    var tableNames = TableNames.getTableNames();
    $scope.movie = {};
    $scope.movieId = $stateParams.movieId;
    $scope.rate = 0;
    $scope.averageRating = 0;
    $scope.user = {};
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.newRating = '';
    Auth.getCurrentUser(user => {
      $scope.user = user;
    });

    $scope.addRating = function(rate, comment) {
      var rating = {
        rate: rate,
        comment: comment,
        user_id: $scope.user._id,
        movie_id: $scope.movieId
      };

      return ApiRequester.createEntity(tableNames.ratings, rating)
        .then(rating => {
          return $scope.getMovieData();
        });
    };

    $scope.getMovieData = function() {
      return ApiRequester.getData(tableNames.movies, {
        where: {
          _id: $scope.movieId
        }
      }).then(function(movie) {
        $scope.movie = _.first(movie);
        var sum = 0;
        _.each($scope.movie.ratings, rating => {
          sum += rating.rate;
        });
        $scope.averageRating = sum / ($scope.movie.ratings.length || 1);
      });
    };

    $scope.getMovieData();

  });
