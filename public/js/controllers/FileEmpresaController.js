'use strict';

MetronicApp.controller('FileEmpresaController',['$scope', '$http','$stateParams', '$cookieStore', 'upload', '$state', function ($scope, $http,$stateParams, $cookieStore, upload, $state) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });


    $scope.empresa = {};

    $http.get('/empresa/' + $cookieStore.get('IdCompany')).success(function (data) {

            $scope.empresa = data;

        })
        .error(function (data) {
            console.log('Error: ' + data);
        });


    $scope.actAvatar = function(){

      var file = $scope.file;
      var empresa = $scope.empresa;
      upload.uploadFile(file,empresa);

    }
}]);
