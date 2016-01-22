'use strict';

describe('Controller: SeancesListCtrl', function () {

  // load the controller's module
  beforeEach(module('dotCinemaApp'));

  var SeancesListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SeancesListCtrl = $controller('SeancesListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
