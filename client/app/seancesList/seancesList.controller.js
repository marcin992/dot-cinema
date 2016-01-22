'use strict';

angular.module('dotCinemaApp')
  .controller('SeancesListCtrl', function ($scope, Movies, $stateParams) {
    $scope.movie = {};
    $scope.movieId = $stateParams.movieId;

    Movies.getMovie($scope.movieId)
      .then(movie => {
        $scope.movie = movie;

        $scope.movie.seances = _.chain($scope.movie.seances)
          .filter(seance => {
            var now = new Date();
            var seanceDate = seance.date;
            return moment(seanceDate) > moment(now);
          }).map(seance => {
            return _.extend(seance, {
              preetyDate: moment(seance.date).format('HH:mm')
            });
          }).value();
        $scope.movie.seances = _.groupByMulti($scope.movie.seances, ['date']);
        console.log($scope.movie.seances);
      });
  });
