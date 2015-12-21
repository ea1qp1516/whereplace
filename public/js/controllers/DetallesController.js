'use strict';

var map;
var myLatLng = {lat: 41.396311, lng: 1.9589427999999316};
var geolocation;
var geocoder;
var direccion;

MetronicApp.controller('DetallesController', function($scope, $http, $stateParams, $cookieStore) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });


    $scope.empresa = {};
    $scope.newComment = {};


    $http.get('/empresa/' + $stateParams.empresa_id).success(function (data) {

            $scope.empresa = data;
            direccion = $scope.empresa.direccion;

        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.nuevoComentario = function() {

        $scope.newComment.user = $cookieStore.get('Name') + " " + $cookieStore.get('Apellidos');
        $http.post('/empresa/' + $stateParams.empresa_id + '/comment', $scope.newComment)
            .success(function(data) {

                $scope.empresa.comentarios = data.comentarios;
                $scope.newComment = {};

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});


function initMap2() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map2'), {
        center: myLatLng,
        zoom: 17
    });
    codeAddress(direccion);//call the function

}


function codeAddress(address)
{
    geocoder.geocode( {address:address}, function(results, status)
    {
        if (status == google.maps.GeocoderStatus.OK)
        {
            map.setCenter(results[0].geometry.location);//center the map over the result
            //place a marker at the location
            var marker = new google.maps.Marker(
                {
                    map: map,
                    position: results[0].geometry.location
                });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}