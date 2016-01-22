'use strict';

describe('Directive: crudList', function () {

  // load the directive's module and view
  beforeEach(module('dotCinemaApp'));
  beforeEach(module('app/crudList/crudList.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<crud-list></crud-list>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the crudList directive');
  }));
});
