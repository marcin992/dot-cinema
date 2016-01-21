'use strict';

moment.locale('pl');

_.mixin({
  groupByMulti: function (obj, values, context) {
    if (!values.length)
      return obj;

    var groupMethod = values[0] === 'date' ? function(el) {
      return moment(el.date).startOf('day').format();
    } : values[0];
    var byFirst = _.groupBy(obj, groupMethod, context),
      rest = values.slice(1);
    for (var prop in byFirst) {
      byFirst[prop] = _.groupByMulti(_.get(byFirst, prop), rest, context);
    }
    return byFirst;
  }
});

angular.module('dotCinemaApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'slick',
    'validation.match',
    'ngAnimate',
    'toastr',
    'mm.foundation',
    'xeditable',
    'ngFileUpload'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookies, $injector) {
    var state;
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('login');
          // remove any stale tokens
          $cookies.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $state, Auth, editableOptions, editableThemes) {
    // Redirect to login if route requires auth and the user is not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (next.authenticate) {
        Auth.isLoggedIn(function (loggedIn) {
          if (!loggedIn) {
            event.preventDefault();
            $state.go('login');
          }
        });
      }
    });

    editableThemes['default'].submitTpl = '<button class="button tiny info">Zapisz</button>'
    editableThemes['default'].cancelTpl = '<button class="button tiny info">Anuluj</button>'
    editableOptions.theme = 'default';
  });
