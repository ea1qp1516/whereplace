var url = "http://localhost:3000";
//192.168.1.41

angular.module('app.controllers', [])

.controller('loginCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})

.controller('loginPost',function($scope,$http,$state) {
    console.log("posting login");



    $scope.loginPost = function() {
      console.log($scope.user);
      $http.post(url + '/user/login', $scope.user)
        .success(function (data) {
          console.log(data);
          $state.go('empresas',{empresas:data});
        })
    }
})

.controller('empresasCtrl', function($scope,$stateParams) {
    console.log('hola');
    console.log($stateParams.empresas);
    $scope.empresas = $stateParams.empresas;

})


