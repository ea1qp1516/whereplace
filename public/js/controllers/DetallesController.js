'use strict';


MetronicApp.controller('DetallesController', function($scope, $http, $stateParams, $state) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });


    $scope.empresa = {};
    $scope.newComment = {};

    $http.get('/empresa/' + $stateParams.empresa_id).success(function (data) {

            $scope.empresa = data;

        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.nuevoComentario = function() {
        $http.post('/empresa/' + $stateParams.empresa_id + '/comment', $scope.newComment)
            .success(function(data) {
                $scope.newComment = {};
                $state.go('detalles');

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});