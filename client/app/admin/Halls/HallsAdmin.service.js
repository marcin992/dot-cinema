'use strict';

angular.module('dotCinemaApp')
  .service('HallsAdminService', function () {
    var hallsAdminService = [];

    hallsAdminService.getView = function(halls, callback) {
    	//var hallViews = [];
    	var hallsWithView = [];

    	for (var hall in halls) {
    		var view = hallsAdminService.createView(halls[hall]);

    		//hallViews.push(view);

    		hallsWithView.push({
    			_id: halls[hall]._id,
    			name: halls[hall].name,
    			chairs: halls[hall].chairs,
    			view: view
    		});
    	}

    	//return hallViews;
    	//return halls;
    	callback(hallsWithView);
    },

    hallsAdminService.createErrors = function() {
    	var errors = [];

    	return errors;
    }

    hallsAdminService.createView = function(hall) {
    	var countPlace = 0;
   		var countRow = 0;
    		
   		for (var row in hall.chairs) {
   			countRow++;
    		countPlace += hall.chairs[row];
    	}

    	var view = {
    		id: hall._id,
   			name: hall.name,    			
   			row: countRow,
    		place: countPlace
    	};

    	return view;
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