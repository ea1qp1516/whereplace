
'use strict'

MetronicApp.controller('EditController', function ($scope, $http, $state, $stateParams, $cookieStore) {

    $scope.empresa = {};
    $scope.empresa = $stateParams.empresa;

    $scope.editar = function () {
    	console.log("hola");
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

    $scope.eliminar = function () {
        $http.delete('/empresas/delete/'+$scope.empresa._id, $scope.empresa)
            .success(function (data) {
            	console.log("aa")
                console.log(data);

            })
            .error(function (data) {
            	console.log("NO Vaaaaaaa");
                console.log('Error: ' + data);
                $state.go('index');
            });
    }
});




