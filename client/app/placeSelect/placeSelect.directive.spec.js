'use strict';

describe('Directive: placeSelect', function () {

  // load the directive's module and view
  beforeEach(module('dotCinemaApp'));
  beforeEach(module('app/placeSelect/placeSelect.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<place-select></place-select>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the placeSelect directive');
  }));
});
