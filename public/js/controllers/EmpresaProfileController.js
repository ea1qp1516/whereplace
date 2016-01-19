'use strict'

MetronicApp.controller('EmpresaProfileController', function ($scope, $http, $state, $cookieStore) {

  $scope.empresa={};


    $http.get('/empresa/'+$cookieStore.get('IdCompany')).success(function (data) {

      $scope.empresa = data;
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });
});
