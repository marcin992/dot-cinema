'use strict';

angular.module('dotCinemaApp')
  .service('HallsAdminService', function () {
    var hallsAdminService = [];

    hallsAdminService.getView = function(halls) {
    	var hallViews = [];

    	for (var hall in halls) {
    		var countPlace = 0;
    		var countRow = 0;
    		
    		for (var row in halls[hall].chairs) {
    			countRow++;
    			countPlace = halls[hall].chairs[row];
    		}

    		var hallView = {
    			id: halls[hall]._id,
    			name: halls[hall].name,
    			row: countRow,
    			place: countPlace
    		};

    		hallViews.push(hallView);
    	}

    	return hallViews;
    }

    return hallsAdminService;
  });

angular.module('dotCinemaApp')
  .factory('HallsAdminFactory', function (ApiRequester, TableNames) {
  	var table = TableNames.getTableNames().halls;
	var hallsAdminFactory = [];

	hallsAdminFactory.get = function(filtr, callback) {
        ApiRequester.getData(table, filtr)
              .then(function (content) {
                callback(content);
              });
      },

    hallsAdminFactory.create = function(hall, callback) {
        ApiRequester.createEntity(table, hall)
              .then(function (content) {
                callback(content);
              });
      },

    hallsAdminFactory.edit = function(hall, callback) {
        ApiRequester.editData(table, hall)
              .then(function (content) {
                callback(content);
              });
      },

    hallsAdminFactory.delete = function(hall, callback) {
        ApiRequester.deleteData(table, hall)
              .then(function (content) {
                callback(content);
              });
      }

    return hallsAdminFactory;
  });