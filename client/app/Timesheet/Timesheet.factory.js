'use strict';

angular.module('dotCinemaApp')
  .constant('API_URI', '/api/timesheets/')
  .factory('Timesheet', ['$http', 'API_URI', function($http, API_URI) {

    function getUrl() {
        return API_URI;
    }

    function getUrlForId(itemId) {
        return getUrl() + itemId;
    }

    var timesheetsFactory = [];
    
    timesheetsFactory.GetAll = function() {
        return $http.get(getUrl());
    },

    timesheetsFactory.Gets = function(Employer) {
        var id = Employer._id;
        return $http.get(getUrlForId("me/" + id));
    },

    timesheetsFactory.End = function(timesheet) {
        return $http.put(getUrl(), timesheet);
    },

    timesheetsFactory.Start = function(timesheet) {
        return $http.post(getUrl(), timesheet);
    },

    timesheetsFactory.Update = function(timesheet) {
        return $http.put(getUrl(), timesheet);
    },

    timesheetsFactory.Delete = function(timesheet) {
        return $http.delete(getUrl(), timesheet);
    },

    timesheetsFactory.GetDateNow = function() {
        return "2015-12-11 11:30:03.10514+01";    
    }

    return timesheetsFactory;
  }]);
