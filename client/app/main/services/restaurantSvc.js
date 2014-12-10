angular.module('wheretoeatApp')
    .factory('restaurantSvc', ['$rootScope', '$http',
        function($rootScope, $http) {
            return {
                findRandomRestaurant: function(type, location) {
                    var uri = '/api/restaurants/random/' + encodeURIComponent(location) + '/' + type;
                    return $http.get(uri);
                },
                eatAtRestaurant: function(restaurant) {
                    var uri = '/api/history';
                    return $http.put(uri, {restaurant: restaurant});
                },
                addToList: function(restaurant) {
                    var uri = '/api/restaurants/list';
                    return $http.put(uri, {restaurant: restaurant});
                },
                retrieveRestaurantList: function() {
                    return $http.get('/api/restaurants/list');
                },
                removeFromList: function(restaurant) {
                    return $http.delete('/api/restaurants/list/' + restaurant.id);
                },
                generateReportByRestaurant: function() {
                    return $http.get('/api/history/report/count');
                },
                generateReportByType: function() {
                    return $http.get('/api/history/report/type');
                },
                generateReportByDay: function() {
                    return $http.get('/api/history/report/day');
                }
            };
        }
    ]);
