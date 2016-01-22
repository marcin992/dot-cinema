'use strict';

describe('Controller: ResetPasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('dotCinemaApp'));

  var ResetPasswordCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResetPasswordCtrl = $controller('ResetPasswordCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
