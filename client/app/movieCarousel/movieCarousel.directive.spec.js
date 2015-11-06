'use strict';

describe('Directive: movieCarousel', function () {

  // load the directive's module and view
  beforeEach(module('dotCinemaApp'));
  beforeEach(module('app/movieCarousel/movieCarousel.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<movie-carousel></movie-carousel>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the movieCarousel directive');
  }));
});
