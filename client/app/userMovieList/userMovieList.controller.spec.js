'use strict';

describe('Controller: UserMovieListCtrl', function () {

  // load the controller's module
  beforeEach(module('dotCinemaApp'));

  var UserMovieListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserMovieListCtrl = $controller('UserMovieListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
