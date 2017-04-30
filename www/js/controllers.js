angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope, $ionicLoading, $compile, Dash) {
        Dash.one(47.545499999999997, -122.39830000000001).then(function (response) {
            function initialize() {
                var myLatlng = new google.maps.LatLng(47.545499999999997, -122.39830000000001);

                var mapOptions = {
                    center: myLatlng,
                    zoom: 16,
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
                for (var i = 0; i < response.length; i++) {
                    var location = response[i];
                    var latLong = new google.maps.LatLng(response[i].latitude, response[i].longitude);
                    var marker = new google.maps.Circle({
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        map: map,
                        center: latLong,
                        radius: Math.sqrt(100 / 5) * 100,
                        id: response[i].id
                    });

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

                navigator.geolocation.getCurrentPosition(function (pos) {
                    $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                    $scope.loading.hide();
                }, function (error) {
                    alert('Unable to get location: ' + error.message);
                });
            };

            $scope.clickTest = function () {
                alert('Example of infowindow with ng-click')
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
