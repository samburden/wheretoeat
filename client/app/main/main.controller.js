'use strict';

angular.module('wheretoeatApp')
  .controller('MainCtrl', ['$scope', '$location', 'Auth', function ($scope, $location, Auth) {

    $scope.selectedMenuItem = 'main';

    $scope.setSelected = function(selected) {
      $scope.selectedMenuItem = selected;
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.currentUser = Auth.getCurrentUser();
  }]);
