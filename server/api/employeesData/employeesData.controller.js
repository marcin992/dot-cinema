/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/employees-data              ->  index
 * POST    /api/employees-data              ->  create
 * GET     /api/employees-data/:id          ->  show
 * PUT     /api/employees-data/:id          ->  update
 * DELETE  /api/employees-data/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var EmployeesData = sqldb.EmployeesData;
var User = sqldb.User;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of EmployeesDatas
exports.index = function(req, res) {
  EmployeesData.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single EmployeesData from the DB
exports.show = function(req, res) {
  EmployeesData.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new EmployeesData in the DB
exports.create = function(req, res) {
  EmployeesData.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing EmployeesData in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  EmployeesData.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a EmployeesData from the DB
exports.destroy = function(req, res) {
  EmployeesData.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};


exports.find = function(req, res) {
  var filtering = req.body;
  var payload = _.merge(filtering, {
    include: [{
      model: User,
      as: 'user'
    }]
  });
  EmployeesData.findAll(payload)
    .then(responseWithResult(res))
    .catch(handleError(res));
};
