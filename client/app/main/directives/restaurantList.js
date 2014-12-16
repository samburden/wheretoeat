angular.module('wheretoeatApp')
    .directive('restaurantList', ['$rootScope', 'restaurantSvc', 'growl', function ($rootScope, restaurantSvc, growl) {
        function link(scope) {
            scope.results = [];
            scope.filteredResults = [];
            scope.data = {currentPage: 0};
            scope.numPerPage = 6;
            scope.maxSize = 5;
            scope.range = [];
            scope.loading = false;

            function retrieveRestaurantList() {
                scope.loading = true;
                restaurantSvc.retrieveRestaurantList().success(function(restaurant) {
                    if (restaurant) {
                      scope.results = restaurant.restaurantList;
                    } else {
                      scope.results = [];
                    }
                    scope.data.currentPage = 1;
                    scope.pageChanged();
                    scope.loading = false;
                }).error(function() {
                    growl.error("Failed to retrieve list");
                    scope.loading = false;
                });
            }
            retrieveRestaurantList();

            scope.pageChanged = function() {
                var begin = ((scope.data.currentPage - 1) * scope.numPerPage)
                    , end = begin + scope.numPerPage;

                scope.filteredResults = scope.results.slice(begin, end);
                scope.range = [];
                for( var i = 0; i < scope.filteredResults.length; i = i + 3 ) {
                    scope.range.push(i);
                }
            };

            scope.removeFromList = function(restaurant) {
                restaurantSvc.removeFromList(restaurant).success(function() {
                    retrieveRestaurantList();
                    growl.success("Restaurant removed successfully");
                }).error(function() {
                    growl.error("Failed to remove from list");
                });
            }

            var unbindListUpdated = $rootScope.$on('wheretoeat.list.updated', function() {
                retrieveRestaurantList();
            });

            // unbind listeners
            scope.$on('$destroy', function() {
                unbindListUpdated();
            });

        }

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/main/directives/restaurantList.html',
            scope: {},
            link: link
        };
    }]);
