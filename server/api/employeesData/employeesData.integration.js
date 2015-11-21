'use strict';

var app = require('../..');
var request = require('supertest');

var newEmployeesData;

describe('EmployeesData API:', function() {

  describe('GET /api/employees-data', function() {
    var employeesDatas;

    beforeEach(function(done) {
      request(app)
        .get('/api/employees-data')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          employeesDatas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(employeesDatas).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/employees-data', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/employees-data')
        .send({
          name: 'New EmployeesData',
          info: 'This is the brand new employeesData!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newEmployeesData = res.body;
          done();
        });
    });

    it('should respond with the newly created employeesData', function() {
      expect(newEmployeesData.name).to.equal('New EmployeesData');
      expect(newEmployeesData.info).to.equal('This is the brand new employeesData!!!');
    });

  });

  describe('GET /api/employees-data/:id', function() {
    var employeesData;

    beforeEach(function(done) {
      request(app)
        .get('/api/employees-data/' + newEmployeesData._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          employeesData = res.body;
          done();
        });
    });

    afterEach(function() {
      employeesData = {};
    });

    it('should respond with the requested employeesData', function() {
      expect(employeesData.name).to.equal('New EmployeesData');
      expect(employeesData.info).to.equal('This is the brand new employeesData!!!');
    });

  });

  describe('PUT /api/employees-data/:id', function() {
    var updatedEmployeesData

    beforeEach(function(done) {
      request(app)
        .put('/api/employees-data/' + newEmployeesData._id)
        .send({
          name: 'Updated EmployeesData',
          info: 'This is the updated employeesData!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEmployeesData = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEmployeesData = {};
    });

    it('should respond with the updated employeesData', function() {
      expect(updatedEmployeesData.name).to.equal('Updated EmployeesData');
      expect(updatedEmployeesData.info).to.equal('This is the updated employeesData!!!');
    });

  });

  describe('DELETE /api/employees-data/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/employees-data/' + newEmployeesData._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when employeesData does not exist', function(done) {
      request(app)
        .delete('/api/employees-data/' + newEmployeesData._id)
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
