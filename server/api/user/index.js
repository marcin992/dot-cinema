'use strict';

import express from 'express';
import controller from './user.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.hasRole('manager'), controller.index);
router.delete('/:id', auth.hasRole('manager'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.post('/:id/avatar', auth.isAuthenticated(), controller.updateAvatar);

module.exports = router;
