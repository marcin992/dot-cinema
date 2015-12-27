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
        cost: "",
        movie: {
        }
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

  	$scope.deleteSeance = function(seance) {
      var confirm = window.confirm("Czy chcesz na pewno skasować seans numer " + seance._id + "?");
      
      if (confirm) {
        var s = SeansesAdminFactory.deleteSeance(seance);
        $scope.alerts.push({
          value: "Sukces! Seans numer " + seance._id + " został usunięty!"
        });
        console.log(s);
      }

  	},

  	$scope.sendDateFromForm = function(formSeance) {
      if (!formRunning) {
        formRunning = true;

        var s = $scope.seanceForm;
        s.date = $scope.dateTime.date.getFullYear() 
          + "-" + $scope.dateTime.date.getMonth() 
          + "-" + $scope.dateTime.date.getDate() 
          + "T" + $scope.dateTime.date.time;

        s.movie = $scope.movie;

        if (s._id == 0) {
          s._id = null;
        }

        if (validateDateTimeSeance(s)) {
          if ($scope.seanceForm._id == 0 || $scope.seanceForm._id == null) {
            var newSeanse = SeansesAdminFactory.addSeanse();
            alerts.push({
              value: "Sukces! Seans dodany!"
            });
          }
          else {
            var editSeanse = SeansesAdminFactory.editSeanse();
            alerts.push({
              value: "Sukces! Seans zeedytowany!"
            });
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

      console.log(filtr);
      console.log(seansesList);

      for (var s in seansesList) {
        if (s._id != seanceToValidate._id) {
          var d = new Date(s);
          d = new Date(new Date(d.getTime() + s.movie.duration*60000))
        }
      }

      return true;
    } 

  });