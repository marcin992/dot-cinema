'use strict';

angular.module('dotCinemaApp')
  .controller('SeansesViewCtrl', function ($scope, ApiRequester, TableNames) {
    var tableNames = TableNames.getTableNames();
    var getDays = function() {
      var result = [];
      _.times(4, function(n) {
        var date = moment().startOf('day').add(n, 'days').format();
        result.push({
          date: date,
          dayName: S(moment(date).format('dddd')).capitalize().s,
          preetyDate: moment(date).format('DD MMMM')
        });
      });
      console.log(result);
      return result;
    };

    $scope.seances = [];

    $scope.days = getDays();

    $scope.isPast = function(seance) {
      return moment() > moment(seance.date);
    };

    var groupSeancesByDate = function (seances) {
      return _.groupByMulti(seances, ['date', 'movie.title']);
    };

    ApiRequester.getData(tableNames.seances)
      .then(function (seances) {
        seances = _.map(seances, seance => {
          return _.merge(seance, {
            hour: moment(seance.date).format('HH:mm')
          });
        });
        $scope.seances = groupSeancesByDate(seances);
        console.log($scope.seances);
      });
  });
