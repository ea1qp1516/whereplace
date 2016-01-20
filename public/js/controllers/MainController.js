'use strict';
var empresas = new Array();

MetronicApp.controller('MainController', function ($scope, $http) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });

    $scope.empresas = {};
    $scope.mostrarHeaderLogin = true;
    $scope.mostrarBotonesHeader = false;

    $http.get('/empresas?count=200').success(function (data) {

            $scope.empresas = data.results;
            empresas = data.results;


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
var geolocation;
var pos;

function initMap() {
    var myLatLng = new google.maps.LatLng(41.2758721, 1.987634899999989);

    my_position();
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 8
    });

    var index;
    for (index = 0; index <empresas.length; index++) {
      pos = new google.maps.LatLng(empresas[index].location[0], empresas[index].location[1]);
      console.log(empresas[index]);
      var marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: empresas[index].nombre
        });
        marker.setMap(map);

    }

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
