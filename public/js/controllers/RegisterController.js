
'use strict';

MetronicApp.controller('RegisterController', function ($scope, $http, $state) {

    $scope.newUser = {};
    $scope.valPassword = {};
    $scope.error = "";
    var numeroAv;


    function aleatorio(inferior,superior){

   	  var numPosibilidades = superior - inferior
   	  var aleat = Math.random() * numPosibilidades
   	  aleat = Math.round(aleat)
   	  return parseInt(inferior) + aleat
}



    $scope.registrarUser = function () {
      numeroAv = Math.floor(Math.random() * 4) ;
      console.log(numeroAv);
      $scope.newUser.avatar = "../../../assets/avatar/"+numeroAv+".jpg";
        if ($scope.newUser.password == $scope.valPassword.password2) {

            $http.post('/user', $scope.newUser)
                .success(function () {

                    $scope.newUser = {};
                    $state.go('index');

                })
                .error(function (data) {
                    console.log('Error: ' + data);
                    $scope.error = "Las contraseñas no coinciden";

                });
        } else {
            console.log('Error');
        }

    };
    $scope.volver = function () {
        $state.go('index');
    };

});
