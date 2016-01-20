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
var empresa;
MetronicApp.controller('DetallesController', function ($scope, $http, $stateParams, $cookieStore) {
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

    $scope.formClassFav = 'btn btn-sm red-thunderbird';
    $scope.formClassIconFav = 'fa fa-star-o';

    $scope.subtags = new Array();
    $scope.empresa ={};
    $scope.newComment = {};
    $scope.newPuntuacion = {};
    $scope.NoPuedes = {};
    $scope.mostrarEstrellas = true;
    $scope.mostrarMensaje = false;


    $scope.favorito = false;
    $scope.user = {};
    $scope.user.favoritos = new Array();
    var fotos;
    $scope.slides = new Array();


    userPuntuador = $cookieStore.get('IdUser');
    $http.get('/user/' + $cookieStore.get('IdUser')).success(function (data) {

        $scope.user = data;
        $scope.user.favoritos = data.favoritos;

    })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $http.get('/empresa/' + $stateParams.empresa_id).success(function (data) {

        $scope.empresa = data;
        empresa = data;


        fotos = data.galeria.split(',');
        var i;
        for(i=0;i<fotos.length-1;i++){

          $scope.slides.push(fotos[i]);
        };

        $scope.user.favoritos.forEach(function (data) {

          if (data._id == $scope.empresa._id) {
            console.log($scope.favorito);
            $scope.favorito = true;

            $scope.formClassFav = 'btn btn-sm yellow-lemon';
            $scope.formClassIconFav = 'fa fa-star';

          }
        });

        var i;
        for(i=0;i<$scope.empresa.subtags.length;i++){
          if($scope.empresa.subtags[i] == null){
          }else{
            $scope.subtags.push($scope.empresa.subtags[i]);
          }
        };

        direccion = $scope.empresa.direccion;

        users = $scope.empresa.puntuacion.users;



    })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.nuevoComentario = function () {

        $scope.newComment.user = $scope.user.nombre + " " + $scope.user.apellidos;
        $scope.newComment.avatar = $scope.user.avatar;
        console.log($scope.newComment);
        $http.post('/empresa/' + $stateParams.empresa_id + '/comment', $scope.newComment)
            .success(function (data) {

                $scope.empresa.comentarios = data.comentarios;
                $scope.newComment = {};

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.puntuar = function (puntuacion) {


    };




    $scope.clickedFav = function (favorito) {

      if(favorito==false){
        $scope.formClassFav = 'btn btn-sm yellow-lemon';
        $scope.formClassIconFav = 'fa fa-star';
        $scope.favorito= true;
        var favSend = {
          user_id: $scope.user._id,
          function: 'add',
          empresa: $scope.empresa
        }

        $http.post('/user/favorito', favSend).success(function (response) {
            console.log(response);
        });

      }
      if(favorito==true){
        $scope.formClassFav = 'btn btn-sm red-thunderbird';
        $scope.formClassIconFav = 'fa fa-star-o';
        $scope.favorito = false;
        var favSend = {
          user_id: $scope.user._id,
          function: 'drop',
          empresa: $scope.empresa
        }

        $http.post('/user/favorito', favSend).success(function (response) {
              console.log(response);
        });

      }

    };


});


function initMap2() {

    var myLatLng = new google.maps.LatLng(empresa.lat, empresa.lng);
    map = new google.maps.Map(document.getElementById('map2'), {
        center: myLatLng,
        zoom: 17
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: empresa.nombre
      });
      marker.setMap(map);

}
