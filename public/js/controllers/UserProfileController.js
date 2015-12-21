'use strict';

MetronicApp.controller('UserProfileController', function ($rootScope, $scope, $http, $cookieStore) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
        Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_profile')); // set profile link active in sidebar menu

        $rootScope.settings.layout.pageSidebarClosed = true;
    });

    $scope.user = {};
    $scope.updateUser = {};
    $scope.gustos = {};


    $http.get('/user/' + $cookieStore.get('IdUser')).success(function (data) {

            $scope.user = data;

        })
        .error(function (data) {
            console.log('Error: ' + data);
        });



}); 
