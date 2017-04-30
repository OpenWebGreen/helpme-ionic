angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope, $ionicLoading, $compile, $state, Dash) {
        Dash.one(47.545499999999997, -122.39830000000001).then(function (response) {
            function initialize() {
                var myLatlng = new google.maps.LatLng(47.545499999999997, -122.39830000000001);

                var mapOptions = {
                    center: myLatlng,
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                };
                var map = new google.maps.Map(document.getElementById("map"),
                    mapOptions);

                //Marker + infowindow + angularjs compiled ng-click
                var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
                var compiled = $compile(contentString)($scope);

                var infowindow = new google.maps.InfoWindow({
                    content: compiled[0]
                });
                var id = [];
                function addClickEvent(marker, i) {
                    marker.addListener('click', function() {
                        $state.go('tab.account')
                    });
                }
                for (var i = 0; i != response.length; i++) {
                    var latLong = new google.maps.LatLng(response[i].latitude, response[i].longitude);
                    id[i] = response[i].id;
                    var marker = new google.maps.Circle({
                        strokeOpacity: 0,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        map: map,
                        center: latLong,
                        radius: Math.sqrt(100 / 5) * 100,
                        latitude: response[i].latitude,
                        longitude: response[i].longitude
                    });
                    addClickEvent(marker, i);
                }

                $scope.map = map;
            }

            google.maps.event.addDomListener(window, 'load', initialize);

            $scope.centerOnMe = function () {
                if (!$scope.map) {
                    return;
                }

                $scope.loading = $ionicLoading.show({
                    content: 'Getting current location...',
                    showBackdrop: false
                });

            };
        });
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
