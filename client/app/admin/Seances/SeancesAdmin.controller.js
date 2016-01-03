'use strict';

angular.module('dotCinemaApp')
  .controller('SeancesAdminController', function ($scope, Auth, SeancesAdminFactory) {
    var User = Auth.getCurrentUser();
     
    $scope.loaded = {
      movies: false, 
      halls: false,
      seances: true
    };
 
    $scope.allMovies = false;
    $scope.errors = [];
    $scope.movies = null;;
    $scope.seances = [];
    $scope.halls = null;
    $scope.movie = null;
    $scope.seanceForm = {};
    $scope.dateTime = {};
    $scope.formShow = false;
    $scope.alerts = [];

    var seancesList = null;

    var limit = 1;
    $scope.moviesToShow = limit;
    $scope.searchRun = false;
    var formRunning = false

    $scope.init = function() {
      SeancesAdminFactory.getMovies(null, function(content){
        $scope.movies = content;

        if ($scope.movies != null) {
          $scope.loaded.movies = true;
        }
      });

      SeancesAdminFactory.getHalls(null, function(content){
        $scope.halls = content;

        if ($scope.halls != null) {
          $scope.loaded.halls = true;
        }
      });

      initSeanceForm();
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

            initSeanceForm();
          }
          else {
            SeancesAdminFactory.editSeance(s);
            $scope.alerts.push({
              value: "Sukces! Seans został zaktualizowany!"
            });

            initSeanceForm();

                for (var i=0; i<$scope.movie.seances.length; i++) {
                  if ($scope.movie.seances[i]._id == s._id) {
                    $scope.movie.seances[i] = s;
                  }
                }
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

        SeancesAdminFactory.getMovies(search, function(content){
          $scope.movies = content;

          if ($scope.movies != null) {
            $scope.loaded.movies = true;
          }
        });

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

      $scope.loaded.seances = false;
      seancesList = [null];

      SeancesAdminFactory.getSeances(filtr, function(content){
          seancesList = content;

          if (seancesList != null) {
            $scope.loaded.seances = true;
          }
        });

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

    function initSeanceForm() {
      $scope.seanceForm = {
        _id: 0,
        hall_id: -1,
        cost: "",
        movie_id: -1
      };

      $scope.dateTime = {
        date: "",
        time: ""
      };      
    }

  });