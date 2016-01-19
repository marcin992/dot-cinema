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

        $scope.dateTime.date.setHours($scope.dateTime.time.split(":")[0]);
        $scope.dateTime.date.setMinutes($scope.dateTime.time.split(":")[1]);
        $scope.dateTime.date.setSeconds(0);
        $scope.dateTime.date.setMilliseconds(0);
        s.movie_id = $scope.movie._id;
        s.date = $scope.dateTime.date;

        var notExistSeance = true;

        if (s.date > new Date()) {

          validateDateTimeSeance(s, function(bool) {
            notExistSeance = bool;

            if (formSeance.$valid && notExistSeance) {
              s.date = s.date.setMinutes(s.date.getMinutes() + ((-1) * s.date.getTimezoneOffset()));

              if ($scope.seanceForm._id == 0 || $scope.seanceForm._id == null) {
                var newSeance = {};

                SeancesAdminFactory.addSeance({
                  date: s.date,
                  hall_id: s.hall_id,
                  cost: s.cost,
                  movie_id: $scope.movie._id
                }, function(data) {
                  newSeance = data;

                  $scope.alerts.push({
                    value: "Sukces! Seans dodany!"
                  });

                  newSeance.hall = getHallFromId(newSeance.hall_id);

                  $scope.movie.seances.push(newSeance);

                  initSeanceForm();
                });
              }
              else {
                SeancesAdminFactory.editSeance(s, function(data) {
                  s = data;
                  s.hall = getHallFromId(s.hall_id);

                  $scope.alerts.push({
                    value: "Sukces! Seans został zaktualizowany!"
                  });

                    initSeanceForm();

                    for (var index in $scope.movie.seances) {
                      if ($scope.movie.seances[index]._id == s._id) {
                        $scope.movie.seances[index] = s;
                      }
                    }
                });
              }
            }
            else {
              $scope.alerts.push({
                value: "Sala o tej porze jest zajęta"
              });
            }

            formRunning = false;
          });
        }
        else {
              $scope.alerts.push({
                value: "Data nie może być wcześniejsza niż dzisiejsza"
              });
        }
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
    },

    $scope.clear = function() {
        initSeanceForm();
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
                  $iLike: '%' + $scope.searchTitle + '%'
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

    function validateDateTimeSeance(seanceToValidate, callback) {
      var date = seanceToValidate.date;

      var filtr = {
        where: {
          hall_id: seanceToValidate.hall_id,
          date: {
            $between: [
              new Date(date - 1000*60*60*24), 
              new Date(date + 1000*60*60*24)
            ]
          }
        }
      }

      $scope.loaded.seances = false;
      seancesList = new Array();

      SeancesAdminFactory.getSeances(filtr, function(content){
          seancesList = content;
          $scope.loaded.seances = true;
          var exist = false;

          for (var i in seancesList) {
                  if (seancesList[i]._id != seanceToValidate._id) {
                    var dateStart = new Date(seancesList[i].date);
                    var dateEnd = new Date(new Date(dateStart.getTime() + seancesList[i].movie.duration * 60000))
                  
                    var seanceDateStart = new Date(seanceToValidate.date);
                    var seanceDateEnd = new Date(new Date(seanceDateStart.getTime() + $scope.movie.duration * 60000))
                  
                    if (dateStart <= seanceDateStart && dateEnd >= seanceDateStart) {
                      exist = true;
                      callback(false);
                      break;
                    }

                    if (dateStart <= seanceDateEnd && dateEnd >= seanceDateEnd) {
                      exist = true;
                      callback(false);
                      break;
                    }
                  }
                }

              if (!exist) {
                callback(true);
              };
        });
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


    function getHallFromId(id) {
      for (var index in $scope.halls) {
        if ($scope.halls[index]._id == id) {
          return $scope.halls[index];
        }

        return {};
      }
    }
  });