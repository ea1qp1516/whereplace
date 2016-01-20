'use strict'

MetronicApp.controller('logincompanyController', function ($scope, $http, $state, $cookieStore) {
    $scope.loginempresa = {};
    console.log($scope.loginempresa);
    $scope.login = function () {
        $http.post('/empresa/login', $scope.loginempresa)
            .success(function (data) {

                $cookieStore.put('IdCompany', data._id);
                $scope.empresa = data;
                $state.go('profile_company');
            })
            .error(function (data) {
                console.log('Error: ' + data);
                $state.go('index');
            });
    }
});
