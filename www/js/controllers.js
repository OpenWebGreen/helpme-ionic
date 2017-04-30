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

                new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: 'Estou aqui'
                });
                //Marker + infowindow + angularjs compiled ng-click
                var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
                var compiled = $compile(contentString)($scope);

                var infowindow = new google.maps.InfoWindow({
                    content: compiled[0]
                });
                var id = [];

                function addClickEvent(marker, i) {
                    marker.addListener('click', function () {
                        $state.go('tab.survival-detail', {id: id[i]})
                    });
                }

                for (var i = 0; i != response.length; i++) {
                    var latLong = new google.maps.LatLng(response[i].latitude, response[i].longitude);
                    id[i] = response[i].id;
                    var color;
                    var size;
                    if (response[i].landslide_size == 'Medium') {
                        color = '#e67e22';
                        size = Math.sqrt(100 / 5) * 100;
                    } else if (response[i].landslide_size == 'Small') {
                        color = '#f1c40f';
                        size = Math.sqrt(100 / 5) * 50;
                    } else {
                        color = '#c0392b'
                        size = Math.sqrt(100 / 5) * 200;
                    }
                    var marker = new google.maps.Circle({
                        strokeOpacity: 0,
                        strokeWeight: 2,
                        fillColor: color,
                        fillOpacity: 0.6,
                        map: map,
                        center: latLong,
                        radius: size,
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

    .controller('SurvivalCtrl', function ($scope, Survival, $stateParams) {
        if ($stateParams.id) {
            Survival.one($stateParams.id).then(function (response) {
                $scope.desastre = response
            })
        }

    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
