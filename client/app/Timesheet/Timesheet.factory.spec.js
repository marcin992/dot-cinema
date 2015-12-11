'use strict';

describe('Factory: Timesheet', function () {

  // load the service's module
  beforeEach(module('dotCinemaApp'));

  // instantiate service
  var Timesheet;
  beforeEach(inject(function (_Timesheet_) {
    Timesheet = _Timesheet_;
  }));

  it('should do something', function () {
    expect(!!Timesheet).to.be.true;
  });

});
