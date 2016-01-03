'use strict';

angular.module('dotCinemaApp')
  .controller('HallsAdminController', function ($scope, HallsAdminService, HallsAdminFactory) {
    $scope.halls = [];
    $scope.hallsView = [];

    $scope.hall = null;

    $scope.loaded = {
    	halls: true
    };

    $scope.messages = [];

    $scope.init = function() {
    	HallsAdminFactory.get(null, function(content){
	        $scope.halls = content;

	        if ($scope.halls != null) {
	          $scope.loaded.halls = true;
	          $scope.hallsView = HallsAdminService.getView($scope.halls);
	        }
      	});

      	hallModelInit();
    }

    $scope.add = function(form) {

    }

    $scope.delete = function(hall) {
		var confirm = window.confirm(
			"Czy chcesz na pewno skasować sale " + hall.name + "?"
			);

		if (confirm) {
	    	HallsAdminFactory.delete(hall, function(content){
		        var deleteHall = content;

		        var index = $scope.halls.indexOf(hall);

		        $scope.halls.splice($scope.halls[index]);
		        $scope.hallsView.splice($scope.hallsView[index]);

		        $scope.messages.push({
		        	key: "delete",
		        	value: "Sala " + hall.name + " została usunięta!"
		        });
	      	});
    	}
    }

    $scope.edit = function(form) {

    }

    function hallModelInit() {
    	$scope.hall = {
    		name: "",
    		chairs: {
    		}
    	}
    }

  });
