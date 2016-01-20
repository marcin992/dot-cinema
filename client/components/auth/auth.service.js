'use strict';

angular.module('dotCinemaApp')
  .factory('Auth', function Auth($http, User, $cookies, $q, RoleHierarchy) {
    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    var safeCb = function(cb) {
      return (angular.isFunction(cb)) ? cb : angular.noop;
    },

    currentUser = {};

    var roleHierarchy = RoleHierarchy.getRoleHierarchy();

    if ($cookies.get('token')) {
      currentUser = User.get();
    }

    var hasRole = function(role, callback) {
      if (arguments.length === 1) {
        return currentUser.role === role || _.contains(roleHierarchy[currentUser.role], role);
      }

      return service.getCurrentUser(null)
        .then(function(user) {
          var is = user.role === role || _.contains(roleHierarchy[user.role], role);
          safeCb(callback)(is);
          return is;
        });
    };

    var service = {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      login: function(user, callback) {
        return $http.post('/auth/local', {
            email: user.email,
            password: user.password
          })
          .then(function(res) {
            $cookies.put('token', res.data.token);
            currentUser = User.get();
            return currentUser.$promise;
          })
          .then(function(user) {
            safeCb(callback)(null, user);
            return user;
          })
          .catch(function(err) {
            this.logout();
            safeCb(callback)(err.data);
            return $q.reject(err.data);
          }.bind(this));
      },

      /**
       * Delete access token and user info
       */
      logout: function() {
        $cookies.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional, function(error, user)
       * @return {Promise}
       */
      createUser: function(user, callback) {
        return User.save(user,
          function(data) {
            $cookies.put('token', data.token);
            currentUser = User.get();
            return safeCb(callback)(null, user);
          },
          function(err) {
            this.logout();
            return safeCb(callback)(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional, function(error, user)
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function() {
          return safeCb(callback)(null);
        }, function(err) {
          return safeCb(callback)(err);
        }).$promise;
      },

      /**
       * Gets all available info on a user
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, funciton(user)
       * @return {Object|Promise}
       */
      getCurrentUser: function(callback) {
        if (arguments.length === 0) {
          return currentUser;
        }

        var value = (currentUser.hasOwnProperty('$promise')) ? currentUser.$promise : currentUser;
        return $q.when(value)
          .then(function(user) {
            safeCb(callback)(user);
            return user;
          }, function() {
            safeCb(callback)({});
            return {};
          });
      },

      /**
       * Check if a user is logged in
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isLoggedIn: function(callback) {
        if (arguments.length === 0) {
          return currentUser.hasOwnProperty('role');
        }

        return this.getCurrentUser(null)
          .then(function(user) {
            var is = user.hasOwnProperty('role');
            safeCb(callback)(is);
            return is;
          });
      },

      /**
       * Check if a user is an admin
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isAdmin: function(callback) {
        return hasRole('admin', callback);
      },

      isCinemaSetter: function(callback) {
        return hasRole('cinema_setter', callback);
      },

      isManager: function(callback) {
        return hasRole('manager', callback);
      },

      isEmployee: function(callback) {
        return hasRole('employee', callback);
      },

      /**
       * Get auth token
       *
       * @return {String} - a token string used for authenticating
       */
      getToken: function() {
        return $cookies.get('token');
      }
    };
    return service;
  });
