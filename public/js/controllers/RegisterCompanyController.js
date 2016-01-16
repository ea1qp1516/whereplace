
'use strict';

MetronicApp.controller('RegisterCompanyController', function ($scope, $http, $state) {
    $scope.mostrarDetalleComida = false;
    $scope.mostrarDetalleDiversion = false;
    $scope.mostrarDetalleNocturno = false;
    $scope.mostrarDetalleCompras = false;
    $scope.newEmpresa = {};
    $scope.todos="";
    $scope.entre="";
    $scope.fines="";
    $scope.manyanas="";
    $scope.tardes="";
    $scope.ambos="";



    $scope.detallesComida = function (comida) {
      $scope.mostrarDetalleComida = true;
      $scope.mostrarDetalleDiversion = false;
      $scope.mostrarDetalleNocturno = false;
      $scope.mostrarDetalleCompras = false;
      $scope.newEmpresa.tags = "comida";

    };

    $scope.detallesDiversion = function (diversion) {
      $scope.mostrarDetalleDiversion = true;
      $scope.mostrarDetalleComida = false;
      $scope.mostrarDetalleNocturno = false;
      $scope.mostrarDetalleCompras = false;
    };

    $scope.detallesNocturno = function (nocturno) {
      $scope.mostrarDetalleNocturno = true;
      $scope.mostrarDetalleComida = false;
      $scope.mostrarDetalleDiversion = false;
      $scope.mostrarDetalleCompras = false;
    };

    $scope.detallesCompras = function (compras) {
      $scope.mostrarDetalleCompras = true;
      $scope.mostrarDetalleComida = false;
      $scope.mostrarDetalleDiversion = false;
      $scope.mostrarDetalleNocturno = false;


    };


    $scope.registrarEmpresa = function () {

          console.log($scope.newEmpresa);
          $scope.newEmpresa.detalles.horario = $scope.todos + $scope.entre + $scope.fines + $scope.manyanas + $scope.tardes + $scope.ambos;

           $http.post('/empresa', $scope.newEmpresa)
               .success(function () {

                   $scope.newEmpresa = {};
                   $state.go('index');

               })
               .error(function (data) {
                   console.log('Error: ' + data);
                   $scope.error = "Las contraseñas no coinciden";

               });



    };



    $scope.volver = function () {
        $state.go('index');
    };

});
