'use strict';

describe('Controller: HallsAdminCtrl', function () {

  // load the controller's module
  beforeEach(module('dotCinemaApp'));

  var HallsAdminCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HallsAdminCtrl = $controller('HallsAdminCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
