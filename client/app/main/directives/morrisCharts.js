'use strict';

angular.module('wheretoeatApp')
  .directive('barChart', function(){
    return {
      restrict: 'A',
      scope: {
        x: '@barX',
        y: '@barY',
        labels: '=',
        barData: '='
      },
      link: function(scope, elem, attrs){
        scope.$watch('barData', function(){
          elem.empty();

          if (scope.barData && scope.barData.length > 0 ){
            new Morris.Bar({
              element: elem,
              data: scope.barData,
              xkey: scope.x,
              ykeys: JSON.parse(scope.y),
              labels: scope.labels,
              xLabelMargin: 2,
              barColors: ['#4b77be'],
              resize: true,
              redraw: true
            })
          }
        })
      }
    }
  })
  .directive('donutChart', function(){
    return {
      restrict: 'A',
      scope: {
        donutData: '='
      },
      link: function(scope, elem, attrs){
        scope.$watch('donutData', function(){
          elem.empty();
          if (scope.donutData){
            new Morris.Donut({
              element: elem,
              data: scope.donutData,
              colors: ['#4b77be', '#44b6ae', '#d84a38', '#8e44ad', '#ffb848', '#4b8df8', '#35aa47', '#e08283', '#8775a7', '#e87e04'],
              hideHover: 'auto',
              resize: true,
              redraw: true
            })
          }
        })
      }
    }
  })
  .directive('lineChart', function(){

    return {
      restrict: 'A',
      scope: {
        lineData: '=',
        lineXkey: '@',
        lineYkeys: '@',
        lineLabels: '@',
        lineColors: '@'
      },
      link: function (scope, elem, attrs){
        var colors,
          morris;
        if (scope.lineColors === void 0 || scope.lineColors === '') {
          colors = null;
        } else {
          colors = JSON.parse(scope.lineColors);
        }
        scope.$watch('lineData', function(){
          elem.empty();
          if(scope.lineData){
            if(!morris) {
              morris = new Morris.Line({
                element: elem,
                data: scope.lineData,
                xkey: scope.lineXkey,
                ykeys: JSON.parse(scope.lineYkeys),
                labels: JSON.parse(scope.lineLabels),
                lineColors: colors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
                hideHover: 'auto',
                resize: true,
                redraw: true
              });
            } else {
              morris.setData(scope.lineData);
            }
          }
        });
      }
    }
  });
