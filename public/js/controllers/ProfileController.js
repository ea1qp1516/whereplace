'use strict';


MetronicApp.controller('ProfileController', function($scope, $http, $stateParams, $state) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });

});