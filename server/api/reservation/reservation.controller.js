/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reservations              ->  index
 * POST    /api/reservations              ->  create
 * GET     /api/reservations/:id          ->  show
 * PUT     /api/reservations/:id          ->  update
 * DELETE  /api/reservations/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Reservation = sqldb.Reservation;
var Seance = sqldb.Seance;
var Movie = sqldb.Movie;
var Hall = sqldb.Hall;
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

// Gets a list of Reservations
exports.index = function(req, res) {
  Reservation.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Reservation from the DB
exports.show = function(req, res) {
  Reservation.find({
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
    include: [{
      model: Seance,
      as: 'seance',
      include: [{
        model: Movie,
        as: 'movie'
      }, {
        model: Hall,
        as: 'hall'
      }]
    }, {
      model: User,
      as: 'user'
    }]
  });
  Reservation.findAll(payload)
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Reservation in the DB
exports.create = function(req, res) {
  Reservation.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Reservation in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Reservation.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Reservation from the DB
exports.destroy = function(req, res) {
  Reservation.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
