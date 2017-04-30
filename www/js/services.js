angular.module('starter.services', [])
    .factory('Dash', function ($http) {
        return {
            one: function (lat, long) {
                return $http.get('http://localhost:8000/api/get-area/' + lat + '/' + long)
                    .then(function (response) {
                        return response.data
                    })
            }
        }
    })

    .factory('Survival', function ($http) {

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            one: function (id) {
                return $http.get('http://localhost:8000/api/get-area/' + id)
                    .then(function (response) {
                        return response.data
                    })
            }
        };
    });
