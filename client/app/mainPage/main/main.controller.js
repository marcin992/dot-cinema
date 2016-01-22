'use strict';
(function() {

function MainController($scope, $http, socket, ApiRequester) {
  $scope.randomReview = {};

  $http.get('api/ratings/get/random').then(result => {
    $scope.randomReview = result.data;
  });
}

angular.module('dotCinemaApp')
  .controller('MainController', MainController);

})();
