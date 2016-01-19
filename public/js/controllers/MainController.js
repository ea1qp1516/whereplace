'use strict';
var direcciones = new Array();

MetronicApp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});
MetronicApp.controller('MainController', function ($scope, $http) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });

    $scope.empresas = {};
    $scope.mostrarHeaderLogin = true;
    $scope.mostrarBotonesHeader = false;

    $http.get('/empresas').success(function (data) {

            $scope.empresas = data;


            var index;
            for (index = 0; index < $scope.empresas.length; index++) {
                direcciones.push($scope.empresas[index].direccion);
            }


    })
    .error(function (data) {
        console.log('Error: ' + data);
    });


    $scope.cargarEmpresas = function(busqueda){
        var empresa = {busqueda: busqueda};
        $http.post('/empresas/busquedas',empresa).success(function (data) {

            $scope.busquedas = data;

        })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    }

});


var map;
var geocoder;
var geolocation;


function initMap() {
    geocoder = new google.maps.Geocoder();


    my_position();
    map = new google.maps.Map(document.getElementById('map'), {
        center: geolocation,
        zoom: 8
    });

    var index;
    for (index = 0; index < direcciones.length; index++) {

        codeAddress(direcciones[index]);

    }

}

function codeAddress(address, next) {
    geocoder.geocode({address: address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(geolocation);
            var marker = new google.maps.Marker(
                {
                    map: map,
                    position: results[0].geometry.location
                });
        } else {
            alert('EL Geocodes no funciona por la siguiente razón:  ' + status);
        }
    });
}

function my_position() {
    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            geolocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        }, function () {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}
