angular.module('wheretoeatApp')
  .controller('ReportCtrl', ['$rootScope', '$scope', 'restaurantSvc',
    function ($rootScope, $scope, restaurantSvc) {

      $scope.typeReportData = [];
      $scope.dayReportData = [];
      $scope.labels = ["Number of times eaten out"];
      $scope.pieLoading = false;
      $scope.barLoading = false;

      function generateReports() {
        $scope.pieLoading = true;
        restaurantSvc.generateReportByType().success(function (result) {
          $scope.pieLoading = false;
          $scope.typeReportData = result;
        });
        $scope.barLoading = true;
        restaurantSvc.generateReportByDay().success(function (result) {
          $scope.dayReportData = result;
          $scope.barLoading = false;
        });
      }

      generateReports();
    }]);
