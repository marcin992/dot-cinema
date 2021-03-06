/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/Schedules', require('./api/Schedule'));
  app.use('/api/timesheets', require('./api/timesheet'));
  app.use('/api/ratings', require('./api/rating'));
  app.use('/api/reservations', require('./api/reservation'));
  app.use('/api/halls', require('./api/hall'));
  app.use('/api/seances', require('./api/seance'));
  app.use('/api/movies', require('./api/movie'));
  app.use('/api/employees-data', require('./api/employeesData'));
   app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);;

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
