'use strict';

describe('Service: HallsAdmin', function () {

  // load the service's module
  beforeEach(module('dotCinemaApp'));

  // instantiate service
  var HallsAdmin;
  beforeEach(inject(function (_HallsAdmin_) {
    HallsAdmin = _HallsAdmin_;
  }));

  it('should do something', function () {
    expect(!!HallsAdmin).to.be.true;
  });

});
