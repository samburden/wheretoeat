angular.module('wheretoeatApp')
  .controller('MainContentCtrl', ['$rootScope', '$scope', 'restaurantSvc',
    function ($rootScope, $scope, restaurantSvc) {

      $scope.reportData = [];

      function generateReport() {
        restaurantSvc.generateReportByRestaurant().success(function(result) {
          $scope.reportData = result;
        });
      }

      generateReport();

      var unbindHistoryUpdated = $rootScope.$on('wheretoeat.history.updated', function() {
        generateReport();
      });

      // unbind listeners
      $scope.$on('$destroy', function() {
        unbindHistoryUpdated();
      });
    }]);
