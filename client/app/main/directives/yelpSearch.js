angular.module('wheretoeatApp')
    .directive('yelpSearch', ['$rootScope', 'yelpSearchSvc', 'growl', 'restaurantSvc', function ($rootScope, yelpSearchSvc, growl, restaurantSvc) {
        function link(scope) {
            scope.formData = {
                location: undefined,
                term: undefined
            }
            scope.results = [];
            scope.filteredResults = [];
            scope.data = {currentPage: 0};
            scope.numPerPage = 6;
            scope.maxSize = 5;
            scope.range = [];
            scope.searching = false;

            scope.performSearch = function() {
              scope.searching = true;
                yelpSearchSvc.searchYelp(scope.formData.location, scope.formData.term).success(function(data) {
                    if (data) {
                        scope.results = data.businesses;
                    }
                    scope.data.currentPage = 1;
                    scope.pageChanged();
                    scope.searching = false;
                }).error(function() {
                    growl.error("Restaurant Search Failed");
                    scope.searching = false;
                })
            }

            scope.pageChanged = function() {
                var begin = ((scope.data.currentPage - 1) * scope.numPerPage)
                    , end = begin + scope.numPerPage;

                scope.filteredResults = scope.results.slice(begin, end);
                scope.range = []
                for( var i = 0; i < scope.filteredResults.length; i = i + 3 ) {
                    scope.range.push(i);
                }
            };

            scope.buttonClick = function(restaurant) {
                if(scope.listContext === 'list') {
                    restaurantSvc.addToList(restaurant).success(function() {
                        $rootScope.$emit('wheretoeat.list.updated');
                        growl.success("Restaurant added to list successfully");
                    }).error(function() {
                        growl.error("Failed to add restaurant");
                    });
                } else {
                    restaurantSvc.eatAtRestaurant(restaurant).success(function() {
                        $rootScope.$emit('wheretoeat.history.updated');
                        growl.success("Successfully saved restaurant choice");
                    }).error(function() {
                        growl.error("Failed to save restaurant choice");
                    });
                }
            }
        }

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/main/directives/yelpSearch.html',
            scope: {
                listContext: '@'
            },
            link: link
        };
    }]);
