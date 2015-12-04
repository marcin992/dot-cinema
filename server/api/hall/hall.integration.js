'use strict';

var app = require('../..');
var request = require('supertest');

var newHall;

describe('Hall API:', function() {

  describe('GET /api/halls', function() {
    var halls;

    beforeEach(function(done) {
      request(app)
        .get('/api/halls')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          halls = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(halls).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/halls', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/halls')
        .send({
          name: 'New Hall',
          info: 'This is the brand new hall!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newHall = res.body;
          done();
        });
    });

    it('should respond with the newly created hall', function() {
      expect(newHall.name).to.equal('New Hall');
      expect(newHall.info).to.equal('This is the brand new hall!!!');
    });

  });

  describe('GET /api/halls/:id', function() {
    var hall;

    beforeEach(function(done) {
      request(app)
        .get('/api/halls/' + newHall._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          hall = res.body;
          done();
        });
    });

    afterEach(function() {
      hall = {};
    });

    it('should respond with the requested hall', function() {
      expect(hall.name).to.equal('New Hall');
      expect(hall.info).to.equal('This is the brand new hall!!!');
    });

  });

  describe('PUT /api/halls/:id', function() {
    var updatedHall

    beforeEach(function(done) {
      request(app)
        .put('/api/halls/' + newHall._id)
        .send({
          name: 'Updated Hall',
          info: 'This is the updated hall!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedHall = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHall = {};
    });

    it('should respond with the updated hall', function() {
      expect(updatedHall.name).to.equal('Updated Hall');
      expect(updatedHall.info).to.equal('This is the updated hall!!!');
    });

  });

  describe('DELETE /api/halls/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/halls/' + newHall._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when hall does not exist', function(done) {
      request(app)
        .delete('/api/halls/' + newHall._id)
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
