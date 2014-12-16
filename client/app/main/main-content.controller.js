angular.module('wheretoeatApp')
  .controller('MainContentCtrl', ['$rootScope', '$scope', 'restaurantSvc',
    function ($rootScope, $scope, restaurantSvc) {

      $scope.reportData = [];
      $scope.loading = false;

      function generateReport() {
        $scope.loading = true;
        restaurantSvc.generateReportByRestaurant().success(function(result) {
          $scope.reportData = result;
          $scope.loading = false;
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
