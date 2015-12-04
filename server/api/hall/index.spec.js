'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var hallCtrlStub = {
  index: 'hallCtrl.index',
  show: 'hallCtrl.show',
  create: 'hallCtrl.create',
  update: 'hallCtrl.update',
  destroy: 'hallCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var hallIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './hall.controller': hallCtrlStub
});

describe('Hall API Router:', function() {

  it('should return an express router instance', function() {
    expect(hallIndex).to.equal(routerStub);
  });

  describe('GET /api/halls', function() {

    it('should route to hall.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'hallCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/halls/:id', function() {

    it('should route to hall.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'hallCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/halls', function() {

    it('should route to hall.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'hallCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/halls/:id', function() {

    it('should route to hall.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'hallCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/halls/:id', function() {

    it('should route to hall.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'hallCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/halls/:id', function() {

    it('should route to hall.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'hallCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
