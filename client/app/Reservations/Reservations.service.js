'use strict';

angular.module('dotCinemaApp')
  .factory('Reservations', function (ApiRequester, Auth, TableNames, $http) {
    var tableNames = TableNames.getTableNames();
    return {
      createReservation: function(newReservation) {
        if(Auth.isLoggedIn()) {
          newReservation = _.merge(newReservation, {
            user_id: Auth.getCurrentUser()._id
          });
          return ApiRequester.createEntity(tableNames.reservations, newReservation);
        } else {
          alert('Zaloguj się!')
        }
      },

      getUsersReservations: function() {
        if(Auth.isLoggedIn()) {
          var user = Auth.getCurrentUser();
          return ApiRequester.getData(tableNames.reservations, {
            where: {
              user_id: user._id
            }
          });
        }
      },

      findReservation: function(reservationCode) {
        if(Auth.isLoggedIn()) {
          return ApiRequester.getData(tableNames.reservations, {
            where: {
              reservation_code: reservationCode
            }
          });
        }
      },

      getById: function(reservationId) {
        if(Auth.isLoggedIn()) {
          return ApiRequester.getData(tableNames.reservations, {
            where: {
              _id: reservationId
            }
          });
        }
      }
    };
  });
