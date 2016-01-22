'use strict';

describe('Controller: SeansesViewCtrlCtrl', function () {

  // load the controller's module
  beforeEach(module('dotCinemaApp'));

  var SeansesViewCtrlCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SeansesViewCtrlCtrl = $controller('SeansesViewCtrlCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
