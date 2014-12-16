angular.module('wheretoeatApp')
    .directive('restaurantPicker', ['$rootScope', 'restaurantSvc', 'growl', function ($rootScope, restaurantSvc, growl) {
        function link(scope) {
            scope.message;
            scope.formData = {
                location: undefined
            }

            scope.searching = false;

            scope.findRestaurantFromYelp = function() {
                findRestaurant('yelp');
            };

            scope.findRestaurantFromList = function() {
                findRestaurant('mylist');
            };

            function findRestaurant(type) {
                scope.message = undefined;
                scope.restaurant = undefined;
                if (scope.formData.location) {
                    scope.searching = true;
                    restaurantSvc.findRandomRestaurant(type, scope.formData.location).success(function(data) {
                        if (data) {
                            scope.restaurant = data;
                        } else if (type === 'mylist') {
                            scope.message = "No restaurants in list. Please add some";
                        }
                        scope.searching = false;
                    }).error(function() {
                        growl.error("Restaurant Search Failed");
                        scope.searching = false;
                    });
                } else {
                    scope.message = "Please enter a location(City,State)";
                }
            }

            scope.eatAtRestaurant = function(restaurant) {
                restaurantSvc.eatAtRestaurant(restaurant).success(function() {
                    $rootScope.$emit('wheretoeat.history.updated');
                    growl.success("Successfully saved restaurant choice");
                }).error(function() {
                    growl.error("Failed to save restaurant choice");
                });
            }

        }

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/main/directives/restaurantPicker.html',
            scope: {},
            link: link
        };
    }]);
