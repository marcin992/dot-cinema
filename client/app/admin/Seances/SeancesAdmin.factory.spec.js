'use strict';

describe('Factory: SeancesAdminFactory', function () {

  // load the service's module
  beforeEach(module('dotCinemaApp'));

  // instantiate service
  var SeancesAdmin;
  beforeEach(inject(function (_SeancesAdmin_) {
    SeancesAdmin = _SeancesAdmin_;
  }));

  it('should do something', function () {
    expect(!!SeancesAdmin).to.be.true;
  });

});
