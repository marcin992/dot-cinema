'use strict';

describe('Controller: MovieListCtrl', function () {

  // load the controller's module
  beforeEach(module('dotCinemaApp'));

  var MovieListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MovieListCtrl = $controller('MovieListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
