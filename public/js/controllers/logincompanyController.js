'use strict'

MetronicApp.controller('logincompanyController', function ($scope, $http, $state, $cookieStore) {
    $scope.loginempresa = {};
    $scope.login = function () {
        $http.post('/empresa/login', $scope.loginempresa)
            .success(function (data ) {
                console.log(data);
                $cookieStore.put('Nombre', data.nombre);
                $cookieStore.put('Email', data.email);
                $cookieStore.put('IdCompany', data._id);
                $scope.empresa = data;
                $state.go('editcompany', {empresa:$scope.empresa});
            })
            .error(function (data) {
                console.log('Error: ' + data);
                $state.go('index');
            });
    }
});