/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/halls              ->  index
 * POST    /api/halls              ->  create
 * GET     /api/halls/:id          ->  show
 * PUT     /api/halls/:id          ->  update
 * DELETE  /api/halls/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Hall = sqldb.Hall;

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

// Gets a list of Halls
exports.index = function(req, res) {
  Hall.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Hall from the DB
exports.show = function(req, res) {
  Hall.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.find = function(req, res) {
  var filtering = req.body;
  var payload = _.merge(filtering, {
  });
  Hall.findAll(payload)
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Hall in the DB
exports.create = function(req, res) {
  Hall.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Hall in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Hall.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Hall from the DB
exports.destroy = function(req, res) {
  Hall.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
