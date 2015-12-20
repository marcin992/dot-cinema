'use strict';

describe('Controller: SeansesAdminController', function () {

  // load the controller's module
  beforeEach(module('dotCinemaApp'));

  var SeansesAdminController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SeansesAdminController = $controller('SeansesAdminController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
