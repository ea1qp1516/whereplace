'use strict'

MetronicApp.controller('EmpresaProfileController', function ($scope, $http, $state, $cookieStore, upload, upload2) {

  $scope.empresa={};
  $scope.mostrarImagen = false;
  $scope.galerias = "";
  var fotos;
  $scope.slides = new Array();


    $http.get('/empresa/'+$cookieStore.get('IdCompany')).success(function (data) {

      $scope.empresa = data;
      console.log(data);
      fotos = data.galeria.split(',');
      var i;
      for(i=0;i<fotos.length-1;i++){
        console.log(fotos[i]);
        console.log(fotos.length);
        $scope.slides.push(fotos[i]);
      }
      console.log($scope.galerias);
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });

    $scope.actAvatar = function(){

      var file = $scope.file;
      console.log(file);
      var empresa = $scope.empresa;
      console.log(empresa);

      upload.uploadFile(file,empresa);

    }
    $scope.actGaleria = function(){

      var file = $scope.file;
      var empresa = $scope.empresa;
      upload2.uploadFile(file,empresa);

    }

    $scope.anadirAvatar = function () {
      $scope.mostrarImagen = true;
    }
    $scope.anadirGaleria = function () {
      $scope.mostrarGallery = true;
    }


});

MetronicApp.directive('uploaderModel', ["$parse", function ($parse){
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs)
        {
            iElement.on("change", function(e){
              $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);

            });
        }

    }

}]);

MetronicApp.service('upload', ["$http", "$cookieStore", function($http,$cookieStore){

        this.uploadFile  = function(file,empresa){


        var formData = new FormData();
        formData.append("file", file);
        $.each(empresa, function (key, value) {
                  console.log(key + " - " + value);
                  formData.append(key, value);
              });
              console.log(formData);
        return $http.post("/empresa/modify_avatar/" + $cookieStore.get('IdCompany'), formData, {
          transformRequest: angular.identity,
          headers: {
            'Content-type': undefined
          }

        })
        .success(function(){
          return false;
        })
        .error(function(){
          return true;
        });

      };

}]);

MetronicApp.service('upload2', ["$http", "$cookieStore", function($http,$cookieStore){

        this.uploadFile  = function(file,empresa){


        var formData = new FormData();
        formData.append("file", file);
        $.each(empresa, function (key, value) {
                  console.log(key + " - " + value);
                  formData.append(key, value);
              });
              console.log(formData);
        return $http.post("/empresa/gallery/" + $cookieStore.get('IdCompany'), formData, {
          transformRequest: angular.identity,
          headers: {
            'Content-type': undefined
          }

        })
        .success(function(){
          return false;
        })
        .error(function(){
          return true;
        });

      };

}]);
