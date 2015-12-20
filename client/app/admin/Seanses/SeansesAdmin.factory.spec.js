'use strict';

describe('Factory: SeansesAdminFactory', function () {

  // load the service's module
  beforeEach(module('dotCinemaApp'));

  // instantiate service
  var SeansesAdmin;
  beforeEach(inject(function (_SeansesAdmin_) {
    SeansesAdmin = _SeansesAdmin_;
  }));

  it('should do something', function () {
    expect(!!SeansesAdmin).to.be.true;
  });

});
