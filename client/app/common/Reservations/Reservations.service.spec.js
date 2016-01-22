'use strict';

describe('Service: Reservations', function () {

  // load the service's module
  beforeEach(module('dotCinemaApp'));

  // instantiate service
  var Reservations;
  beforeEach(inject(function (_Reservations_) {
    Reservations = _Reservations_;
  }));

  it('should do something', function () {
    expect(!!Reservations).to.be.true;
  });

});
