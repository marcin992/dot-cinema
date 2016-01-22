'use strict';

describe('Directive: reservationInfo', function () {

  // load the directive's module and view
  beforeEach(module('dotCinemaApp'));
  beforeEach(module('app/reservationInfo/reservationInfo.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<reservation-info></reservation-info>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the reservationInfo directive');
  }));
});
