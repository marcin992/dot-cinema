'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ScheduleCtrlStub = {
  index: 'ScheduleCtrl.index',
  show: 'ScheduleCtrl.show',
  create: 'ScheduleCtrl.create',
  update: 'ScheduleCtrl.update',
  destroy: 'ScheduleCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ScheduleIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './Schedule.controller': ScheduleCtrlStub
});

describe('Schedule API Router:', function() {

  it('should return an express router instance', function() {
    expect(ScheduleIndex).to.equal(routerStub);
  });

  describe('GET /api/Schedules', function() {

    it('should route to Schedule.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'ScheduleCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/Schedules/:id', function() {

    it('should route to Schedule.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'ScheduleCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/Schedules', function() {

    it('should route to Schedule.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'ScheduleCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/Schedules/:id', function() {

    it('should route to Schedule.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'ScheduleCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/Schedules/:id', function() {

    it('should route to Schedule.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'ScheduleCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/Schedules/:id', function() {

    it('should route to Schedule.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'ScheduleCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
