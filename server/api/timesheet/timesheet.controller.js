/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/timesheets              ->  index
 * POST    /api/timesheets              ->  create
 * GET     /api/timesheets/:id          ->  show
 * PUT     /api/timesheets/:id          ->  update
 * DELETE  /api/timesheets/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Timesheet = sqldb.Timesheet;

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

// Gets a list of Timesheets
exports.index = function(req, res) {
  Timesheet.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Timesheet from the DB
exports.show = function(req, res) {
  Timesheet.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a list of timesheets for employeesData
exports.me = function(req, res) {
  Timesheet.findAll({
    where: {
      employee_data_id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Timesheet in the DB
exports.create = function(req, res) {
  Timesheet.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Timesheet in the DB
exports.update = function(req, res) {
  console.log(req);
  console.log("---");
  console.log(res);
  
  if (req.body._id) {
    delete req.body._id;
  }
  Timesheet.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.find = function(req, res) {
  var filtering = req.body;
  Timesheet.find(filtering)
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Timesheet from the DB
exports.destroy = function(req, res) {
  Timesheet.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
