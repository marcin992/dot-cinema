'use strict';
(function() {

function MainController($scope, $http, socket, ApiRequester) {
  $scope.randomReview = null;

  $http.get('api/ratings/get/random').then(result => {
    $scope.randomReview = result.data;
    console.log($scope.randomReview.movie.cover);
  });
}

angular.module('dotCinemaApp')
  .controller('MainController', MainController);

})();
