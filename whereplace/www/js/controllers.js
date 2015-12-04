var url = "http://localhost:3000";

angular.module('app.controllers', [])

.controller('registroCtrl', function($scope) {

})

.controller('usuarioCtrl', function($scope,$state) {


    $scope.userRegistro = function() {
      var now = new Date();
      var age = now.getFullYear() - $scope.newUser.edad.getFullYear();
      $scope.newUser.edad = age;
      console.log($scope.newUser);
      $state.go('gustos',{user:$scope.newUser});
    }




})

.controller('empresaCtrl', function($scope) {

})

.controller('gustosCtrl', function($scope, Gustos, $stateParams, $state, $http) {
    $scope.newUser = $stateParams.user;
    console.log("estoi en gustos");
    console.log(Gustos);
    $scope.gustos = Gustos.all();

    $scope.userGustos = function(gustos) {
      console.log(gustos);
      var newGustos = [];
      gustos.forEach(function(gusto){
        if(gusto.checked) {
          newGustos.push(gusto.name);
        }
      });
      $scope.newUser.gustos = newGustos;
      console.log($scope.newUser.genero)
      $http.post(url + '/user/', $scope.newUser)
       .success(function (data) {
       console.log(data);
       $state.go('resultadoBusqueda',{empresas:data});
       })
    }

})

.controller('resultadoBusquedaCtrl', function($scope, $state,$stateParams) {
    $scope.goLista = function() {
      console.log($stateParams.empresas);
      $state.go('empresas',{empresas:$stateParams.empresas});
    }

})

.controller('empresasCtrl', function($scope,$stateParams) {

    console.log($stateParams.empresas);
    $scope.empresas = $stateParams.empresas;

})

.controller('tipoDeNegocioCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})



.controller('googleMapsCtrl', function($scope) {

})

.controller('loginFacebookCtrl', function($scope) {

})

.controller('perfilusuarioCtrl', function($scope) {

})

.controller('favoritosCtrl', function($scope) {

})

.controller('settingsCtrl', function($scope) {

})

.controller('loginPost',function($scope,$http,$state) {
  console.log("posting login");

  $scope.loginPost = function() {
    console.log($scope.user);
    $http.post(url + '/user/login', $scope.user)
      .success(function (data) {
        console.log(data);
        $state.go('resultadoBusqueda',{empresas:data});
      })
  }
})

.controller('googleMapsCtrl', function($scope, $ionicLoading, $state) {
    console.log("HOLA");
    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });

        $scope.map = map;
    });

});


