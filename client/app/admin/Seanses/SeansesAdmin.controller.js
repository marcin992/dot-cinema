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
    $scope.seanceForm = {};
    $scope.dateTime = {};
    $scope.formShow = false;
    $scope.alerts = [];

    var limit = 1;
    $scope.moviesToShow = limit;
    $scope.searchRun = false;
    var formRunning = false

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

      $scope.seanceForm = {
        _id: 0,
        hall_id: -1,
        cost: ""
      };
  	},

  	$scope.editSeance = function(seance) {
      $scope.seanceForm = {
        _id: seance._id,
        hall_id: seance.hall_id,
        cost: seance.cost
      };

      var date = new Date(seance.date.split("T")[0]);

      $scope.dateTime = {
        date: date,
        time: seance.date.split("T")[1].split(".")[0]
      };

      $scope.formShow = true;
  	},

  	$scope.deleteSeanse = function(seance) {
      var confirm = confirm("Czy chcesz na pewno skasowa seans numer " + seance._id + "?");
      console.log(confirm);

  	},

  	$scope.sendDateFromForm = function(formSeance) {
      console.log($scope.seanceForm);
      console.log($scope.dateTime);

      if (formSeance.$valid && !formRunning) {
        formRunning = true;

        var s = $scope.seanceForm;
        s.date = $scope.dateTime.date.getFullYear() 
          + "-" + $scope.date.dateTime.getMonth() 
          + "-" + $scope.date.dateTime.getDate() 
          + "T" + $scope.date.dateTime.time;

        if (s._id == 0) {
          s._id = null;
        }

        if (validateDateTimeSeance(s)) {
          if ($scope.seanceForm._id == 0) {
            var newSeanse = SeansesAdminFactory.addSeanse();
          }
          else {
            var editSeanse = SeansesAdminFactory.editSeanse();
          }
        }
        else {
          alerts.push({
            value: "Sala o tej porze jest zajęta"
          });
        }

        formRunning = false;
      }
  	},

    $scope.selectMovie = function(movie) {
        $scope.movie = movie;
    },

    $scope.showAll = function() {
        $scope.moviesToShow = $scope.movies.length;
        $scope.movie = null;
        $scope.formShow = false;
    },

    $scope.showForm = function() {
      if (!$scope.formShow) {
        $scope.formShow = true;
      }
      else {
        $scope.formShow = false;
      }
    }

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
        $scope.loaded.movies = true;
        $scope.moviesToShow = limit;
        $scope.searchRun = false;
      }
    }

    function validateDateTimeSeance(seanceToValidate) {
      var date = new Date(seanceToValidate.date.split("T"));

      var filtr = {
        where: {
          hall_id: seanceToValidate._id,
          date: {
            $between: [
              new Date(date - 1000*60*60*24), 
              new Date(date + - 1000*60*60*24)
            ]
          }
        }
      }

      var seansesList = SeansesAdminFactory.getSeanses(filtr);

      for (var s in seansesList) {
        console.log(s);
      }

      return true;
    } 

  });