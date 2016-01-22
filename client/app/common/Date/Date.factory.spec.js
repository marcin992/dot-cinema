'use strict';

describe('Service: Date', function () {

  // load the service's module
  beforeEach(module('dotCinemaApp'));

  // instantiate service
  var Date;
  beforeEach(inject(function (_Date_) {
    Date = _Date_;
  }));

  it('should do something', function () {
    expect(!!Date).to.be.true;
  });

});
