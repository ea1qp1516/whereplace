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
MetronicApp.controller('AdminPanelController', function($scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });

    $http.get('/empresas').success(function(data){
            $scope.empresas = data;
            console.log(data);

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});