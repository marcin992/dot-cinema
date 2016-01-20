'use strict';

describe('Service: Employees', function () {

  // load the service's module
  beforeEach(module('dotCinemaApp'));

  // instantiate service
  var Employees;
  beforeEach(inject(function (_Employees_) {
    Employees = _Employees_;
  }));

  it('should do something', function () {
    expect(!!Employees).to.be.true;
  });

});
