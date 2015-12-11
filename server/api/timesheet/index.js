'use strict';

var express = require('express');
var controller = require('./timesheet.controller');
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/me/:id', auth.isAuthenticated(),  controller.me);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/find', auth.isAuthenticated(), controller.find);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
