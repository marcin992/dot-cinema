'use strict';

describe('Service: TableNames', function () {

  // load the service's module
  beforeEach(module('dotCinemaApp'));

  // instantiate service
  var TableNames;
  beforeEach(inject(function (_TableNames_) {
    TableNames = _TableNames_;
  }));

  it('should do something', function () {
    expect(!!TableNames).to.be.true;
  });

});
