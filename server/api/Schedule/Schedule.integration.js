'use strict';

var app = require('../..');
var request = require('supertest');

var newSchedule;

describe('Schedule API:', function() {

  describe('GET /api/Schedules', function() {
    var Schedules;

    beforeEach(function(done) {
      request(app)
        .get('/api/Schedules')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          Schedules = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(Schedules).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/Schedules', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/Schedules')
        .send({
          name: 'New Schedule',
          info: 'This is the brand new Schedule!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSchedule = res.body;
          done();
        });
    });

    it('should respond with the newly created Schedule', function() {
      expect(newSchedule.name).to.equal('New Schedule');
      expect(newSchedule.info).to.equal('This is the brand new Schedule!!!');
    });

  });

  describe('GET /api/Schedules/:id', function() {
    var Schedule;

    beforeEach(function(done) {
      request(app)
        .get('/api/Schedules/' + newSchedule._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          Schedule = res.body;
          done();
        });
    });

    afterEach(function() {
      Schedule = {};
    });

    it('should respond with the requested Schedule', function() {
      expect(Schedule.name).to.equal('New Schedule');
      expect(Schedule.info).to.equal('This is the brand new Schedule!!!');
    });

  });

  describe('PUT /api/Schedules/:id', function() {
    var updatedSchedule

    beforeEach(function(done) {
      request(app)
        .put('/api/Schedules/' + newSchedule._id)
        .send({
          name: 'Updated Schedule',
          info: 'This is the updated Schedule!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSchedule = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSchedule = {};
    });

    it('should respond with the updated Schedule', function() {
      expect(updatedSchedule.name).to.equal('Updated Schedule');
      expect(updatedSchedule.info).to.equal('This is the updated Schedule!!!');
    });

  });

  describe('DELETE /api/Schedules/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/Schedules/' + newSchedule._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Schedule does not exist', function(done) {
      request(app)
        .delete('/api/Schedules/' + newSchedule._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
