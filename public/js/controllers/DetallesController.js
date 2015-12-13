'use strict';


MetronicApp.controller('DetallesController', function($scope, $http, $stateParams) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });


    $scope.empresa = {};
    $http.get('/empresa/' + $stateParams.empresa_id).success(function (data) {

            $scope.empresa = data;

        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

});