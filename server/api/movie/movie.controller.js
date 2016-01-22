/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/movies              ->  index
 * POST    /api/movies              ->  create
 * GET     /api/movies/:id          ->  show
 * PUT     /api/movies/:id          ->  update
 * DELETE  /api/movies/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Movie = sqldb.Movie;
var Seance = sqldb.Seance;
var Hall = sqldb.Hall;
var Rating = sqldb.Rating;
var User = sqldb.User;
var formidable = require('formidable');

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

// Gets a list of Movies
exports.index = function(req, res) {
  Movie.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Movie from the DB
exports.show = function(req, res) {
  Movie.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.find = function(req, res) {
  var payload = _.merge(req.body, {
    include: [{
      model: Seance,
      as: 'seances',
      include: [{
        model: Hall,
        as: "hall"
      }]
    }, {
      model: Rating,
      as: 'ratings',
      include: [{
        model: User,
        as: 'user'
      }]
    }]
  });
  Movie.findAll(payload)
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Movie in the DB
exports.create = function(req, res) {
  Movie.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Movie in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Movie.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Movie from the DB
exports.destroy = function(req, res) {
  Movie.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

exports.changeCover = function(req, res) {
  var movieId = req.params.id;

  var form = new formidable.IncomingForm();
  form.uploadDir = './client/assets/images/covers/';
  form.keepExtensions = true;

  form.parse(req, function(err, fields, files) {
    var filename = files.file.path.match(/([^\/]+)$/);
    filename = filename ? filename[0] : null;

    Movie.find({
      where: {
        _id: movieId
      }
    }).then(function(movie) {
      if(!movie) {
        return res.status(401).end();
      }
      movie.cover = filename;
      return movie.save();
    }).then(function(result) {
      res.send(result);
    });
  });
};
