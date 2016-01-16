/**
 * Created by Usuario on 11/12/2015.
 */
'use strict';

MetronicApp.filter('propsFilter', function() {
    return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function(item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});
MetronicApp.controller('AdminPanelController', function($scope, $http, $stateParams, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });
    // Función para coger el objeto seleccionado en la tabla
    $scope.selectCompany = function(empresa) {
        $scope.newEmpresa = empresa;
        $scope.selected = true;
        console.log($scope.newEmpresa, $scope.selected);
    };
    $scope.borrarEmpresa = function(newEmpresa) {
        console.log(newEmpresa);
        $http.delete('/empresas/delete/' + newEmpresa._id)
            .success(function(data) {
                $scope.newEmpresa = {};
                $scope.empresas = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $http.get('/empresas').success(function(data){
            $scope.empresas = data;
            console.log(data);

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.getEmpresa = function(editEmpresa){
        console.log(editEmpresa);
        $http.get('/empresa/' + editEmpresa._id).success(function(data){
            $scope.editEmpresa = data;
            console.log("DATAAAAA" +data._id);
        }).error(function(data){
            console.log("Error: " + data);
        })
    }
    // Función para registrar a una empresa
    $scope.registrarEmpresa = function() {
        $http.post('/empresa', $scope.newEmpresa)
            .success(function(data) {
                $scope.newEmpresa = {};
                location.reload();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $http.get('/user').success(function(data){
        $scope.users = data;
        console.log(data);

    })

    $scope.actualizarEmpresa = function (editEmpresa){
        $http.put('/empresa/modify/' + $scope.editEmpresa._id, $scope.editEmpresa)
            .success(function(data) {
                $scope.editEmpresa = {}; // Borramos los datos del formulario
                $scope.editEmpresa = {};
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    }

    $scope.borrarUser = function(newUser) {
        console.log(newEmpresa);
        $http.delete('/empresas/delete/' + newEmpresa._id)
            .success(function(data) {
                $scope.newEmpresa = {};
                $scope.empresas = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});