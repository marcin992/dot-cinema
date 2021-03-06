'use strict';

import {User, EmployeesData} from '../../sqldb';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import {sender} from '../../components/MailSender';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).end();
  };
}

var createToken = function(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < length; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.findAll({
    attributes: [
      '_id',
      'name',
      'email',
      'role',
      'provider'
    ]
  })
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(handleError(res));
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  var newUser = User.build(req.body);
  newUser.setDataValue('provider', 'local');
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresInMinutes: 60 * 5
      });
      sender.sendMail(user.email, 'Dot-cinema - nowe konto', `Witaj ${user.nick}!
      \nInformujemy, że konto w serwisie Dot-cinema zostało założone pomyślnie.
      \nPozdrawiamy,
      \nZespół Dot-cinema`, console.log);
      res.json({ token: token, user: user });
    })
    .catch(validationError(res));
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  User.find({
    where: {
      _id: userId
    }
  })
    .then(function(user) {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.destroy({where: { _id: req.params.id }})
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.find({
    where: {
      _id: userId
    }
  })
    .then(function(user) {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(function() {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;

  User.find({
    where: {
      _id: userId
    },
    attributes: [
      '_id',
      'nick',
      'email',
      'role',
      'provider',
      'avatar'
    ],
    include: [{
      model: EmployeesData,
      as: 'employee_data'
    }]
  })
    .then(function(user) { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(function(err) {
      return next(err);
    });
};

exports.update = function(req, res, next) {
  var userId = req.params.id;
  User.find({
    where: {
      _id: userId
    }
  }).then(function(user) {
    if(!user) {
      return res.status(401).end();
    }
    user.email = req.body.email;
    user.nick = req.body.nick;
    user.role = req.body.role;
    return user.save();
  }).then(function(user) {
    res.send(user);
  });
};

exports.updateAvatar = function(req, res, next) {
  var userId = req.params.id;

  var form = new formidable.IncomingForm();
  form.uploadDir = './client/assets/images/avatars/';
  form.keepExtensions = true;

  form.parse(req, function(err, fields, files) {
    var filename = files.file.path.match(/([^\/]+)$/);
    filename = filename ? filename[0] : null;
    User.find({
      where: {
        _id: userId
      }
    }).then(function(user) {
      if(!user) {
        return res.status(401).end();
      }
      user.avatar = filename;
      return user.save()
    }).then(function(user) {
      res.send(user)
    });
  });
};

exports.remindPassword = function(req, res) {
  var email = req.body.email;
  var token = createToken(30);
  User.find({
    where: {
      email: email
    }
  }).then(function(user) {
    if(user) {
      user.reset_password_token = token;
      return user.save();
    }
  }).then(function(user) {
    sender.sendMail(email, 'Zapomniane hasło', 'Witaj. Została wysłana prośba zresetowania hasła.' +
      'Aby przejść dalej przejdź na adres http://' + req.headers.host + '/reset/' + user.reset_password_token +'\n' +
      'Jeśli nie wysyłałeś zapytania, proszę zignoruj tego maila.\n\n' +
      'Pozdrawiamy,\n' +
      'Dot-cinema', function(err, data) {
      if(err) {
        res.status(500).send(err);
      } else {
        res.send({status: 'success'});
      }

    });
  })
};

exports.resetPassword = function(req, res) {
  var token = req.body.token;
  var newPassword = createToken(10);
  User.find({
    where: {
      reset_password_token: token
    }
  }).then(function(user) {
    if(user) {
      user.password = newPassword;
      return user.save();
    } else {
      return res.status(404).send({message: 'Nie znaleziono użytkownika'});
    }
  }).then(function(user) {
    console.log(user);
    sender.sendMail(user.email, 'Resetowanie hasła', 'Witaj. Zresetowaliśmy Twoje hasło. Twoje nowe hasło to: \n\n' +
      newPassword + '\n\n' +
      'Pozdrawiamy,\n' +
      'Dot-cinema', function(err, data) {
      if(err) {
        res.status(500).send(err);
      } else {
        res.send({status: 'success'});
      }

    });
  })
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
