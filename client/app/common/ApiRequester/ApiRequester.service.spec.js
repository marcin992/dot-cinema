'use strict';

describe('Service: ApiRequester', function () {

  // load the service's module
  beforeEach(module('dotCinemaApp'));

  // instantiate service
  var ApiRequester;
  beforeEach(inject(function (_ApiRequester_) {
    ApiRequester = _ApiRequester_;
  }));

  it('should do something', function () {
    expect(!!ApiRequester).to.be.true;
  });

});
