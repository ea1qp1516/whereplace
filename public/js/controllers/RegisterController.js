
'use strict';

MetronicApp.controller('RegisterController', function ($scope, $http, $state) {

    $scope.newUser = {};
    $scope.valPassword = {};
    $scope.error = "";
    $scope.empresa = {};
    $scope.mostrarAlertNom = false;
    $scope.mostrarAlertApe = false;
    $scope.mostrarAlertCon = false;
    $scope.mostrarAlertEm = false;
    $scope.mostrarAlertFecha = false;
    $scope.mostrarRepe = false;
    var numeroAv;


    function aleatorio(inferior,superior){

   	  var numPosibilidades = superior - inferior
   	  var aleat = Math.random() * numPosibilidades
   	  aleat = Math.round(aleat)
   	  return parseInt(inferior) + aleat
}



    $scope.registrarUser = function () {
      numeroAv = Math.floor(Math.random() * 12) ;

       if($scope.newUser.password != $scope.password2){

          $scope.mostrarAlertCon = true;
      }
      else{

        $http.post('/user/find', $scope.newUser)
          .success(function (data) {
            console.log(data);

              if(data[0] == undefined){
                $scope.newUser.avatar = "/assets/avatar/"+numeroAv+".png";

                $http.post('/user', $scope.newUser)
                  .success(function () {

                    $scope.newUser = {};
                    $state.go('index');

                    })
                      .error(function (data) {
                          console.log('Error: ' + data);
                            $scope.error = "Las contraseñas no coinciden";

                            });
                            $scope.newUser = {};
                            $state.go('index');
              }else{

                  $scope.mostrarRepe = true;

              }


            })
              .error(function (data) {
                  console.log('Error: ' + data);
                    $scope.error = "Las contraseñas no coinciden";

                    });



      }

};

$scope.volver = function () {
    window.location.href ="/";
};


});
