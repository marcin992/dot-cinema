'use strict';

angular.module('dotCinemaApp')
  .controller('SeancesAdminController', function ($scope, Auth, SeancesAdminFactory) {
    var User = Auth.getCurrentUser();
     
    $scope.loaded = {
      movies: false, 
      halls: false,
      seances: false
    };
 
    $scope.allMovies = false;
    $scope.errors = [];
    $scope.movies = [];
    $scope.seances = [];
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
      $scope.halls = SeancesAdminFactory.getHalls(null);
      $scope.movies = SeancesAdminFactory.getMovies(null);

      setTimeout(function() {
        if ($scope.halls.length > 0) {
          $scope.loaded.halls = true;
        }
        else {
          setTimeout(function() {
            $scope.halls = SeancesAdminFactory.getHalls(null);
            $scope.loaded.halls = true;
          }, 2000);
        }

        if ($scope.movies.length > 0) {
          $scope.loaded.movies = true;
        }
        else {
          setTimeout(function() {
            $scope.movies = SeancesAdminFactory.getMovies(null);  
            $scope.loaded.movies = true;
          }, 2000);
        }
      }, 1000);

      $scope.seanceForm = {
        _id: 0,
        hall_id: -1,
        cost: "",
        movie_id: -1
      };
    },

    $scope.editSeance = function(seance) {
      $scope.seanceForm = {
        _id: seance._id,
        hall_id: seance.hall_id,
        cost: seance.cost
      };

      var date = new Date(seance.date.split("T")[0]);
      var time = seance.date.split("T")[1].split(".")[0].split(":")

      $scope.dateTime = {
        date: date,
        time: time[0] + ":" + time[1]
      };

      $scope.formShow = true;
    },

    $scope.deleteSeance = function(seance) {
      var confirm = window.confirm("Czy chcesz na pewno skasować seans numer " + seance._id + "?");
      
      if (confirm) {
        var s = SeancesAdminFactory.deleteSeance(seance);

        if (s == undefined) {
          $scope.alerts.push({
            value: "Sukces! Seans numer " + seance._id + " został usunięty!"
          });

          $scope.movie.seances.splice(seance);
        }
      }

    },

    $scope.sendDateFromForm = function(formSeance) {
      if (!formRunning) {
        formRunning = true;

        console.log(formSeance);

        var s = $scope.seanceForm;
        s.date = $scope.dateTime.date.getFullYear() 
          + "-" + $scope.dateTime.date.getMonth() 
          + "-" + $scope.dateTime.date.getDate() 
          + "T" + $scope.dateTime.time + ":00";

        s.movie_id = $scope.movie_id;

        if (formSeance.$valid && validateDateTimeSeance(s)) {
          if ($scope.seanceForm._id == 0 || $scope.seanceForm._id == null) {
            var newSeance = SeancesAdminFactory.addSeance({
              date: s.date,
              hall_id: s.hall_id,
              cost: s.cost,
              movie_id: $scope.movie._id
            });
            $scope.alerts.push({
              value: "Sukces! Seans dodany!"
            });

            $scope.movie.seances.push(newSeance);
          }
          else {
            var editSeance = SeancesAdminFactory.editSeance(s);
            $scope.alerts.push({
              value: "Sukces! Seans został zaktualizowany!"
            });

            setTimeout(function() {
              if (editSeance != undefined || editSeance._id != undefined) {
                for (var i=0; i<$scope.movie.seances.length; i++) {
                  if ($scope.movie.seances[i]._id == editSeance._id) {
                    $scope.movie.seances[i] = editSeance;
                  }
                }
              }
            }, 10000);
          }
        }
        else {
          $scope.alerts.push({
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
                  $like: '%' + $scope.searchTitle + '%'
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

        $scope.movies = SeancesAdminFactory.getMovies(search);
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
              new Date(date + 1000*60*60*24)
            ]
          }
        }
      }

      var seancesList = SeancesAdminFactory.getSeances(filtr);

      for (var s in seancesList) {
        if (s._id != seanceToValidate._id) {
          var dateStart = new Date(s);
          var dateEnd = new Date(new Date(dateStart.getTime() + $scope.movie.duration * 60000))
        
          var seanceDateStart = new Date(seanceToValidate);
          var seanceDateEnd = new Date(new Date(seanceDateStart.getTime() + $scope.movie.duration * 60000))
        
          if (dateStart <= seanceDateStart) {
            return false;
          }

          if (dateStart <= seanceDateEnd) {
            return false;
          }

          if (dateEnd <= seanceDateStart) {
            return false;
          }

          if (dateEnd <= seanceDateEnd) {
            return false;
          }
        }
      }

      return true;
    } 

  });