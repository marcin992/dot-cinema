'use strict';

angular.module('dotCinemaApp')
  .factory('Timesheet', function (ApiRequester, Auth, TableNames) {

    var timesheetsFactory = [];
    
    timesheetsFactory.GetAll = function() {
        return $http.get(getUrl());
    },

    timesheetsFactory.Gets = function(Employer) {
        var id = Employer._id;
        return $http.get(getUrlForId("me/" + id));
    },

    timesheetsFactory.Start = function(timesheet) {
        return $http.post(getUrl(), timesheet);
    },

    timesheetsFactory.Update = function(timesheet) {
        return $http.put(getUrlForId(timesheet._id), timesheet);
    },

    timesheetsFactory.Delete = function(timesheet) {
        return $http.delete(getUrlForId() + "/" + timesheet._id, timesheet);
    },

    timesheetsFactory.GetDateNow = function() {
        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        return year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec;   
    }

    return timesheetsFactory;
  }]);
