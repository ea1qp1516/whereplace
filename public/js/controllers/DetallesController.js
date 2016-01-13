'use strict';

var map;
var myLatLng = {lat: 41.396311, lng: 1.9589427999999316};
var geolocation;
var geocoder;
var direccion;
var contador;
var calificacion;
var users = new Array();
var userPuntuador;
var booleano;

MetronicApp.controller('DetallesController', function($scope, $http, $stateParams, $cookieStore) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });
    var map;
    var myLatLng = {lat: 41.396311, lng: 1.9589427999999316};
    var geolocation;
    var geocoder;
    var direccion;
    var contador;
    var calificacion;
    var users = new Array();
    var userPuntuador;
    var booleano;


    $scope.empresa = {};
    $scope.newComment = {};
    $scope.newPuntuacion = {};
    $scope.NoPuedes = {};
    $scope.mostrarEstrellas = true;
    $scope.mostrarMensaje = false;
    userPuntuador = $cookieStore.get('IdUser');
    console.log(userPuntuador);




    $http.get('/empresa/' + $stateParams.empresa_id).success(function (data) {

            $scope.empresa = data;
            direccion = $scope.empresa.direccion;
            contador = $scope.empresa.puntuacion.contador;
            calificacion = $scope.empresa.puntuacion.puntuacion;
            if(contador == null && calificacion == null){
              contador = 0;
              calificacion = 0;
            }
            users = $scope.empresa.puntuacion.users;
            console.log(users.length);

        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.nuevoComentario = function() {

        $scope.newComment.user = $cookieStore.get('Name') + " " + $cookieStore.get('Apellidos');
        $scope.newComment.avatar = $cookieStore.get('Avatar');
        console.log($scope.newComment);
        $http.post('/empresa/' + $stateParams.empresa_id + '/comment', $scope.newComment)
            .success(function(data) {

                $scope.empresa.comentarios = data.comentarios;
                $scope.newComment = {};

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.puntuar = function(puntuacion){
      if(users.length == 0){
        booleano = 1;
        if(booleano == 1){

            users.push($cookieStore.get('IdUser'));
            $scope.newPuntuacion.users = users;

            ++contador;
            console.log("Contador: " +contador);
            var puntuacion_final= (calificacion + puntuacion);
            console.log("Puntuacion Final: " + puntuacion_final);

            $scope.newPuntuacion.puntuacion = puntuacion_final;
            $scope.newPuntuacion.contador = contador;

          }else{
            $scope.mostrarEstrellas=false;
            $scope.mostrarMensaje = true;
            $scope.NoPuedes = "Ya has puntuado, grácias!";
        }

      }else {
        var i;
        for(i in users){
          console.log("Users: " + users[i]);
            if(users[i] == userPuntuador){
                booleano = 0;
            }else{
              booleano = 1;
            }
        }

        if(booleano == 1){

            users.push($cookieStore.get('IdUser'));
            $scope.newPuntuacion.users = users;

            ++contador;
            console.log("Contador: " +contador);
            var puntuacion_final= (calificacion + puntuacion);
            console.log("Puntuacion Final: " + puntuacion_final);

            $scope.newPuntuacion.puntuacion = puntuacion_final;
            $scope.newPuntuacion.contador = contador;

          }else{
            $scope.mostrarEstrellas=false;
            $scope.mostrarMensaje = true;
            $scope.NoPuedes = "Ya has puntuado, gracias por tu colaboración!";
        }

      }

      $http.post('/empresa/' + $stateParams.empresa_id + '/rating', $scope.newPuntuacion)
          .success(function(data) {

              $scope.newPuntuacion = {};

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
