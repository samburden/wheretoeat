'use strict';

angular.module('wheretoeatApp')
  .controller('HomeCtrl', ['$scope', '$window', function ($scope, $window) {
    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  }]);
