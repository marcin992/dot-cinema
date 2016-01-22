'use strict';

describe('Directive: seansesView', function () {

  // load the directive's module and view
  beforeEach(module('dotCinemaApp'));
  beforeEach(module('app/seansesView/seansesView.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<seanses-view></seanses-view>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the seansesView directive');
  }));
});
