'use strict';

describe('Controller: SeanceCtrl', function () {

  // load the controller's module
  beforeEach(module('dotCinemaApp'));

  var SeanceCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SeanceCtrl = $controller('SeanceCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
