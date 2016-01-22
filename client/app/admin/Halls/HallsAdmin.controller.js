'use strict';

angular.module('dotCinemaApp')
  .controller('HallsAdminController', function ($scope, HallsAdminService, HallsAdminFactory) {
    $scope.halls = [];

    $scope.hall = null;

    $scope.loaded = {
    	halls: true
    };

    $scope.errors = HallsAdminService.createErrors();

    $scope.messages = [];

    $scope.hallEdit = null;

    $scope.init = function() {
    	HallsAdminFactory.get(null, function(content){
	        $scope.halls = content;

	        if ($scope.halls != null) {
	          //$scope.hallsView = HallsAdminService.getView($scope.halls);
	          //$scope.halls = HallsAdminService.getView($scope.halls);
	          //$scope.loaded.halls = true;

	          HallsAdminService.getView($scope.halls, function(content) {
	          	$scope.halls = content;
	          	$scope.loaded.halls = true;
	          });
	        }
      	});

      	hallModelInit();
    },

    $scope.formAction = function(form) {
    	if (form.$valid) {
        	if (!checkHallsName()) {
        		newMessage("error", "Nazwa rzędu musi być unikalna!");
        	}

        	var chairs = {};

    		for (var i=0; i<$scope.hall.chairs.length; i++) {
    			if ($scope.hall.chairs[i] != undefined) {
    				chairs[$scope.hall.chairs[i].key] = $scope.hall.chairs[i].value;
    			}
    		}

    		if($scope.hall._id == undefined && $scope.hallEdit == null) {
    			var newSeance = {
    				name: $scope.hall.name,
    				chairs: chairs
    			}

    			HallsAdminFactory.create(newSeance, function(content) {
    				var c = content;
    				newMessage("edit", "Seans {0} został dodany!".replace("{0}", newSeance.name));
					$scope.init();
    			});
    		}
			else if ($scope.hall._id == $scope.hallEdit._id) {
				var newSeance = {
    				_id: $scope.hall._id,
    				name: $scope.hall.name,
    				chairs: chairs
    			}

    			HallsAdminFactory.edit(newSeance, function(content) {
    				newSeance = content;
					newMessage("edit", "Seans został zaktualizowany!");
      	     		$scope.init();
    			});

/*
    			var index = $scope.halls.indexOf($scope.hallEdit);

    			newSeance = {
    				_id: newSeance._id,
    				name: newSeance.name,
    				chairs: newSeance_chairs,
    				view: HallsAdminService.createView(newSeance)
    			}

      	     	$scope.halls[index] = newSeance;
*/

			}
    	}
    },

    $scope.clear = function() {
    	hallModelInit();
    },


    $scope.delete = function(hall) {
		var confirm = window.confirm(
			"Czy chcesz na pewno skasować sale " + hall.name + "?"
			);

		if (confirm) {
	    	HallsAdminFactory.delete(hall, function(content){
		        var deleteHall = content;

		        var index = $scope.halls.indexOf(hall);

		        $scope.halls.splice($scope.halls[index], 1);

		        if(hallEdit != null) {
			        if (hallEdit._id == $scope.halls[index]._id) {
			        	$scope.clear();
			        }
				}
                newMessage("delete", "Sala " + hall.name + " została usunięta!");
	      	});
    	}
    },

    $scope.edit = function(hall) {
    	var chairs = [];

    	for (var row in hall.chairs) {
    		chairs.push({
    			key: row,
    			value: hall.chairs[row]
    		});
    	}

  		$scope.hall = {
  			_id: hall._id,
  			name: hall.name,
  			chairs: chairs
  		}

  		$scope.hallEdit = hall;
    },

    $scope.remove = function(index) {
    	$scope.hall.chairs.splice(index, 1);

    	if ($scope.hall.chairs.length == 0) {
    		$scope.hall.chairs.push({
    			key: "",
    			value: ""
    		});
    	}
	},

	$scope.add = function() {
		$scope.hall.chairs.push({
			key: "",
			value: ""
		});
	}

    function hallModelInit() {
    	$scope.hall = {
    		name: "",
    		chairs: [{
    			key: "",
    			value: ""
    		}]
    	}

    	$scope.hallEdit = null;
    }

    function checkHallsName() {
    	for (var index in $scope.hall.chairs) {
    		for (var index2 in $scope.hall.chairs) {
    			if ($scope.hall.chairs[index].key == $scope.hall.chairs[index2].key) {
					if (index != index2) {
						return false;
					}
				}
    		}
    	}

    	return true;
    }

    function newMessage(key, value) {
    	$scope.messages.push({
		        	key: key,
		        	value: value
		        });
    }

  });
