angular.module('wheretoeatApp')
    .factory('yelpSearchSvc', ['$rootScope', '$http',
        function($rootScope, $http) {
            return {
                searchYelp: function(location, term) {
                    var uri = '/api/yelp/' + encodeURIComponent(location);
                    if (term) {
                        uri += ('/' + encodeURIComponent(term));
                    }
                    return $http.get(uri);
                }
            };
        }
    ]);
