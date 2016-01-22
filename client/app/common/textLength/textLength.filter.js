'use strict';

angular.module('dotCinemaApp')
  .filter('textLength', function () {
    return function (input) {
      if(input) {
        return input.length >= 300 ? input.slice(0, 300) + '...' : input;
      }
    };
  });
