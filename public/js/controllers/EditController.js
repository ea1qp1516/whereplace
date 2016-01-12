
'use strict'

MetronicApp.controller('EditController', function ($scope, $http, $state, $cookieStore) {
    $scope.loginempresa = {};
    $scope.login = function () {
        $http.post('/empresa/login', $scope.loginempresa)
            .success(function (data ) {
                console.log(data);
                $cookieStore.put('Nombre', data.nombre);
                $cookieStore.put('Email', data.email);
                $cookieStore.put('IdCompany', data._id);
                $scope.empresa = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
                $state.go('index');
            });
    }

    $scope.editar = function () {
        $http.post('/empresa/modify/'+$scope.empresa._id, $scope.empresa)
            .success(function (data) {
                console.log(data);

            })
            .error(function (data) {
            	console.log("NO Vaaaaaaa");
                console.log('Error: ' + data);
                $state.go('index');
            });
    }
});




