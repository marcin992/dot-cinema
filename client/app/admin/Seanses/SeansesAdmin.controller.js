'use strict';

angular.module('dotCinemaApp')
  .controller('SeansesAdminController', function ($scope, Auth, SeansesAdminFactory) {
  	var User = Auth.getCurrentUser();
  	 
  	$scope.loaded = {
      movies: false, 
      halls: false,
      seanses: false
    };
 
    $scope.allMovies = false;
  	$scope.errors = [];
  	$scope.movies = [];
  	$scope.seanses = [];
    $scope.halls = [];
    $scope.movie = null;
    $scope.seanceForm = { _id: 0 };

    var limit = 1;
    $scope.moviesToShow = limit;
    $scope.searchRun = false;

  	$scope.init = function() {
      $scope.halls = SeansesAdminFactory.getHalls(null);
      $scope.movies = SeansesAdminFactory.getMovies(null);

      setTimeout(function() {
        if ($scope.halls.length > 0) {
          $scope.loaded.halls = true;
        }
        else {
          setTimeout(function() {
            $scope.halls = SeansesAdminFactory.getHalls(null);
            $scope.loaded.halls = true;
          }, 2000);
        }

        if ($scope.movies.length > 0) {
          $scope.loaded.movies = true;
        }
        else {
          setTimeout(function() {
            $scope.movies = SeansesAdminFactory.getMovies(null);  
            $scope.loaded.movies = true;
          }, 2000);
        }
      }, 1000);
  	},

  	$scope.editSeance = function(seance) {
      $scope.seanceForm = {
        _id: seance._id,
        date: seance.date.split("T")[0],
        time: seance.date.split("T")[1].split(".")[0],
        hall_id: seance.hall_id,
        cost: seance.cost
      }
  	},

  	$scope.deleteSeanse = function(seance) {
      console.log(seance);
  	},

  	$scope.seanceForm = function(formSeance) {
      console.log(formSeance);
  	},

    $scope.selectMovie = function(movie) {
        $scope.movie = movie;
    },

    $scope.showAll = function() {
        $scope.moviesToShow = $scope.movies.length;
        $scope.movie = null;
    },

    $scope.search = function(form) {
      if (form.$valid && !$scope.searchRun) {
        $scope.searchRun = true;
        $scope.loaded.movies = false;
        $scope.movie = null;
        
        if ($scope.searchTitle.length > 0 
              && $scope.searchTitle != null 
              && $scope.searchTitle != "" 
              && $scope.searchTitle != undefined) {
          if (isNaN($scope.searchTitle)) {
            var search = { 
              where: {
                title: {
                  $like: $scope.searchTitle
                }
              }
            };
          }
          else {
            var search = { 
              where: {
                _id: $scope.searchTitle
              }
            };
          }
        }
        else {
          var search = null;
        }

        $scope.movies = SeansesAdminFactory.getMovies(search);
        console.log($scope.movies);
        $scope.loaded.movies = true;
        $scope.moviesToShow = limit;
        $scope.searchRun = false;
      }
    }

  });