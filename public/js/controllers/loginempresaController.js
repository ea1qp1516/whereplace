var myApp = angular.module('MainApp', []);

function loginempresaController($scope, $http) {
    $scope.newEmpresa = {};
    $scope.newUser = {};
    $scope.loginUser = {};
    $scope.empresas = {};


    // Función para registrar a una empresa
    $scope.registrarEmpresa = function() {
        $http.post('/empresa', $scope.newEmpresa)
            .success(function(data) {
                $scope.newEmpresa = {};
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Función para registrar a un usuario
    $scope.registrarUser = function() {
        $http.post('/user', $scope.newUser)
            .success(function(data) {
                $scope.newUser = {};
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Función para registrar a un usuario
    $scope.login = function() {
        console.log("bieen");
        $http.post('/user/login', $scope.loginUser)
            .success(function(data) {
                $scope.loginUser = {};
                location.href = 'views/main.html'
                console.log("bieen");

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $http.get('/empresas').success(function(data) {

        $scope.empresas = data;
        console.log("Log Empresas" + data);
    })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}