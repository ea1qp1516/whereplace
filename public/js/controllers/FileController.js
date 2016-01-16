'use strict';

MetronicApp.controller('FileController',['$scope', '$http','$stateParams', '$cookieStore', 'upload', '$state', function ($scope, $http,$stateParams, $cookieStore, upload, $state) {
    $scope.$on('$viewContentLoaded', function () {
        Metronic.initAjax(); // initialize core components
    });


    $scope.user = $stateParams.user;
    
  /*  $http.get('/user/' + $cookieStore.get('IdUser')).success(function (data) {

            $scope.user = data;

        })
        .error(function (data) {
            console.log('Error: ' + data);
        });*/


    $scope.actAvatar = function(){

      var file = $scope.file;
      var user = $scope.user;
      upload.uploadFile(file,user);
      $state.go('profile.dashboard');
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

        this.uploadFile  = function(file,user){


        var formData = new FormData();
        formData.append("file", file);
        $.each(user, function (key, value) {
                  console.log(key + " - " + value);
                  formData.append(key, value);
              });
              console.log(formData);
        return $http.post("/user/modify_avatar/" + $cookieStore.get('IdUser'), formData, {
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
