'use strict';

describe('Directive: reservationList', function () {

  // load the directive's module and view
  beforeEach(module('dotCinemaApp'));
  beforeEach(module('app/reservationList/reservationList.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<reservation-list></reservation-list>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the reservationList directive');
  }));
});
