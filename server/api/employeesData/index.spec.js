'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var employeesDataCtrlStub = {
  index: 'employeesDataCtrl.index',
  show: 'employeesDataCtrl.show',
  create: 'employeesDataCtrl.create',
  update: 'employeesDataCtrl.update',
  destroy: 'employeesDataCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var employeesDataIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './employeesData.controller': employeesDataCtrlStub
});

describe('EmployeesData API Router:', function() {

  it('should return an express router instance', function() {
    expect(employeesDataIndex).to.equal(routerStub);
  });

  describe('GET /api/employees-data', function() {

    it('should route to employeesData.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'employeesDataCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/employees-data/:id', function() {

    it('should route to employeesData.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'employeesDataCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/employees-data', function() {

    it('should route to employeesData.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'employeesDataCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/employees-data/:id', function() {

    it('should route to employeesData.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'employeesDataCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/employees-data/:id', function() {

    it('should route to employeesData.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'employeesDataCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/employees-data/:id', function() {

    it('should route to employeesData.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'employeesDataCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
