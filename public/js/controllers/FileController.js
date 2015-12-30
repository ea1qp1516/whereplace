'use strict';

MetronicApp.controller('FileController',['$scope', 'upload', '$cookieStore', '$http', function ($scope, $http, $cookieStore, upload) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });

    $scope.uploadFile = function(){

      var name = $scope.name;
      var file = $scope.file;
      upload.uploadFile(file).then(function(res){
        console.log(res);
      })
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

MetronicApp.service('upload', ["$http", "$q", "$cookieStore", function($http, $q, $cookieStore){

      this.uploadFile  = function(file){

        var deferred = $q.defer();
        var formData = new FormData();
        formData.append("file", file);

        return $http.post("/user/" + $cookieStore.get('IdUser'), formData, {
          headers: {
            "Content-type": undefined
          },
          transformRequest: formData
        })
        .success(function(res){
          deferred.resolve(res);
        })
        .error(function(msg,code){
          deferred.reject(msg);
        })
        return deferred.promise;
      }


}])
