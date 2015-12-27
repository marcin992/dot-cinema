'use strict';

describe('Controller: SeancesAdminController', function () {

  // load the controller's module
  beforeEach(module('dotCinemaApp'));

  var SeancesAdminController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SeancesAdminController = $controller('SeancesAdminController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
