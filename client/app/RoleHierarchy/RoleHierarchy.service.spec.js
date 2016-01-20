'use strict';

describe('Service: RoleHierarchy', function () {

  // load the service's module
  beforeEach(module('dotCinemaApp'));

  // instantiate service
  var RoleHierarchy;
  beforeEach(inject(function (_RoleHierarchy_) {
    RoleHierarchy = _RoleHierarchy_;
  }));

  it('should do something', function () {
    expect(!!RoleHierarchy).to.be.true;
  });

});
