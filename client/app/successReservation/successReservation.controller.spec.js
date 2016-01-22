'use strict';

describe('Controller: SuccessReservationCtrl', function () {

  // load the controller's module
  beforeEach(module('dotCinemaApp'));

  var SuccessReservationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuccessReservationCtrl = $controller('SuccessReservationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
