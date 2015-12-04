'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var seanceCtrlStub = {
  index: 'seanceCtrl.index',
  show: 'seanceCtrl.show',
  create: 'seanceCtrl.create',
  update: 'seanceCtrl.update',
  destroy: 'seanceCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var seanceIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './seance.controller': seanceCtrlStub
});

describe('Seance API Router:', function() {

  it('should return an express router instance', function() {
    expect(seanceIndex).to.equal(routerStub);
  });

  describe('GET /api/seances', function() {

    it('should route to seance.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'seanceCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/seances/:id', function() {

    it('should route to seance.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'seanceCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/seances', function() {

    it('should route to seance.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'seanceCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/seances/:id', function() {

    it('should route to seance.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'seanceCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/seances/:id', function() {

    it('should route to seance.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'seanceCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/seances/:id', function() {

    it('should route to seance.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'seanceCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
