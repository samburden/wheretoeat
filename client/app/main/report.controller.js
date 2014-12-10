angular.module('wheretoeatApp')
  .controller('ReportCtrl', ['$rootScope', '$scope', 'restaurantSvc',
    function ($rootScope, $scope, restaurantSvc) {

      $scope.typeReportData = [];
      $scope.dayReportData = [];
      $scope.labels = ["Number of times eaten out"]

      function generateReports() {
        restaurantSvc.generateReportByType().success(function (result) {
          $scope.typeReportData = result;
        });

        restaurantSvc.generateReportByDay().success(function (result) {
          $scope.dayReportData = result;
        });
      }

      generateReports();
    }]);
