'use strict';

var app = require('../..');
var request = require('supertest');

var newSeance;

describe('Seance API:', function() {

  describe('GET /api/seances', function() {
    var seances;

    beforeEach(function(done) {
      request(app)
        .get('/api/seances')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          seances = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(seances).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/seances', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/seances')
        .send({
          name: 'New Seance',
          info: 'This is the brand new seance!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSeance = res.body;
          done();
        });
    });

    it('should respond with the newly created seance', function() {
      expect(newSeance.name).to.equal('New Seance');
      expect(newSeance.info).to.equal('This is the brand new seance!!!');
    });

  });

  describe('GET /api/seances/:id', function() {
    var seance;

    beforeEach(function(done) {
      request(app)
        .get('/api/seances/' + newSeance._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          seance = res.body;
          done();
        });
    });

    afterEach(function() {
      seance = {};
    });

    it('should respond with the requested seance', function() {
      expect(seance.name).to.equal('New Seance');
      expect(seance.info).to.equal('This is the brand new seance!!!');
    });

  });

  describe('PUT /api/seances/:id', function() {
    var updatedSeance

    beforeEach(function(done) {
      request(app)
        .put('/api/seances/' + newSeance._id)
        .send({
          name: 'Updated Seance',
          info: 'This is the updated seance!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSeance = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSeance = {};
    });

    it('should respond with the updated seance', function() {
      expect(updatedSeance.name).to.equal('Updated Seance');
      expect(updatedSeance.info).to.equal('This is the updated seance!!!');
    });

  });

  describe('DELETE /api/seances/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/seances/' + newSeance._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when seance does not exist', function(done) {
      request(app)
        .delete('/api/seances/' + newSeance._id)
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
