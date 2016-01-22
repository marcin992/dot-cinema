'use strict';

describe('Service: Seanses', function () {

  // load the service's module
  beforeEach(module('dotCinemaApp'));

  // instantiate service
  var Seanses;
  beforeEach(inject(function (_Seanses_) {
    Seanses = _Seanses_;
  }));

  it('should do something', function () {
    expect(!!Seanses).to.be.true;
  });

});
