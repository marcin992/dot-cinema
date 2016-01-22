'use strict';

describe('Controller: PasswordChangeCtrl', function () {

  // load the controller's module
  beforeEach(module('dotCinemaApp'));

  var PasswordChangeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PasswordChangeCtrl = $controller('PasswordChangeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
