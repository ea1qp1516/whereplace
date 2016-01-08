'use strict';

MetronicApp.controller('FileController',['$scope', '$http', '$cookieStore', 'upload', function ($scope, $http, $cookieStore, upload) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });

    $scope.actAvatar = function(){

      var file = $scope.file;
      upload.uploadFile(file);
    }
}]);

MetronicApp.directive('uploaderModel', ["$parse", function ($parse){
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs)
        {
            iElement.on("change", function(e){
              $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);

            });
        }

    }

}]);

MetronicApp.service('upload', ["$http", "$cookieStore", function($http,$cookieStore){

      this.uploadFile  = function(file){


        var formData = new FormData();
        formData.append("file", file);

        return $http.put("/user/" + $cookieStore.get('IdUser'), formData, {
          transformRequest: angular.identity,
          headers: {
            'Content-type': undefined
          }

        })
        .success(function(){
          return false;
        })
        .error(function(){
          return true;
        });

      };

}]);
