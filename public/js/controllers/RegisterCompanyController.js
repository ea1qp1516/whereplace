
'use strict';

MetronicApp.controller('RegisterCompanyController', function ($scope, $http, $state) {

    $scope.mostrarMapa = false;

    $scope.mostrarDetalleComida = false;
    $scope.mostrarDetalleDiversion = false;
    $scope.mostrarDetalleNocturno = false;
    $scope.mostrarDetalleCompras = false;
    $scope.mostrarSubtagsComida = false;
    $scope.newEmpresa = {};
    $scope.newEmpresa.lat;
    $scope.newEmpresa.lng;
    var numeroAv;


    //FormsTagsComida
    $scope.formClassCh = 'btn btn-sm blue-steel';
    $scope.formClassIconCh = 'fa fa-plus';
    $scope.formClassIta= 'btn btn-sm blue-steel';
    $scope.formClassIconIta = 'fa fa-plus';
    $scope.formClassEsp = 'btn btn-sm blue-steel';
    $scope.formClassIconEsp = 'fa fa-plus';
    $scope.formClassInd = 'btn btn-sm blue-steel';
    $scope.formClassIconInd = 'fa fa-plus';
    var lat;
    var lng;

    var contch;
    var contita;
    var contesp;
    var contind;

//Forms tags Diversion

    $scope.formClassTeatro = 'btn btn-sm blue-steel';
    $scope.formClassIconTeatro = 'fa fa-plus';
    $scope.formClassCine = 'btn btn-sm blue-steel';
    $scope.formClassIconCine = 'fa fa-plus';
    $scope.formClassParque = 'btn btn-sm blue-steel';
    $scope.formClassIconParque = 'fa fa-plus';
    $scope.formClassOtros = 'btn btn-sm blue-steel';
    $scope.formClassIconOtros = 'fa fa-plus';

    var conttea;
    var contcine;
    var contparq;
    var contotr;

    //Form tags Nocturno
    $scope.formClassDisco = 'btn btn-sm blue-steel';
    $scope.formClassIconDisco = 'fa fa-plus';
    $scope.formClassCopas = 'btn btn-sm blue-steel';
    $scope.formClassIconCopas = 'fa fa-plus';
    $scope.formClassGin = 'btn btn-sm blue-steel';
    $scope.formClassIconGin = 'fa fa-plus';
    $scope.formClassCock = 'btn btn-sm blue-steel';
    $scope.formClassIconCock = 'fa fa-plus';
    $scope.formClassAlt = 'btn btn-sm blue-steel';
    $scope.formClassIconAlt = 'fa fa-plus';

    var contdisco;
    var contcopas;
    var contgin;
    var contcock;
    var contalt;

    $scope.newEmpresa.subtags = new Array();
    $scope.click = true;
    $scope.click1 = true;
    $scope.click2 = true;
    $scope.click3 = true;
    $scope.click4 = true;
    $scope.click5 = true;

    $scope.todos="";
    $scope.entre="";
    $scope.fines="";
    $scope.manyanas="";
    $scope.tardes="";
    $scope.ambos="";
    $scope.subtags = new Array();



    $scope.clickedChino = function (click) {

      if(click==true){
        $scope.formClassCh = 'btn btn-sm green-meadow';
        $scope.formClassIconCh = 'fa fa-coffee';

        if($scope.newEmpresa.subtags.length == 0 ){
          contch = 0;
        }else{
          contch = $scope.newEmpresa.subtags.length - 1;
        }
        $scope.newEmpresa.subtags.push("chino");
        $scope.click= false;
      }
      if(click==false){
        $scope.formClassCh = 'btn btn-sm blue-steel';
        $scope.formClassIconCh = 'fa fa-plus';
        delete $scope.newEmpresa.subtags[contch];
        $scope.click = true;
      }

    };
    $scope.clickedItaliano = function (click) {

      if(click==true){
        $scope.formClassIta = 'btn btn-sm green-meadow';
        $scope.formClassIconIta = 'fa fa-coffee';
        if($scope.newEmpresa.subtags.length == 0 ){
          contita = 0;
        }else{
          contita = $scope.newEmpresa.subtags.length - 1;
        }
        $scope.newEmpresa.subtags.push("italiano");
        $scope.click= false;

      }
      if(click==false){
        $scope.formClass = 'btn btn-sm blue-steel';
        $scope.formClassIcon = 'fa fa-plus';
        delete $scope.newEmpresa.subtags[contita];
        $scope.click = true;
      }

    };
    $scope.clickedEspanol = function (click) {

      if(click==true){
        $scope.formClassEsp = 'btn btn-sm green-meadow';
        $scope.formClassIconEsp = 'fa fa-coffee';
        if($scope.newEmpresa.subtags.length == 0 ){
          contesp = 0;
        }else{
          contesp = $scope.newEmpresa.subtags.length - 1;
        }

        $scope.newEmpresa.subtags.push("espanol");
        $scope.click= false;
      }
      if(click==false){
        $scope.formClassEsp = 'btn btn-sm blue-steel';
        $scope.formClassIconEsp = 'fa fa-plus';
        delete $scope.newEmpresa.subtags[contesp];
        $scope.click = true;
      }

    };
    $scope.clickedIndio = function (click) {

      if(click==true){
        $scope.formClassInd = 'btn btn-sm green-meadow';
        $scope.formClassIconInd = 'fa fa-coffee';
        if($scope.newEmpresa.subtags.length == 0 ){
          contind = 0;
        }else{
          contind = $scope.newEmpresa.subtags.length - 1;
        }
        $scope.newEmpresa.subtags.push("indio");
        $scope.click= false;
      }
      if(click==false){
        $scope.formClassInd = 'btn btn-sm blue-steel';
        $scope.formClassIconInd = 'fa fa-plus';
        delete $scope.newEmpresa.subtags[contind];
        $scope.click = true;
      }

    };


    /*

      Clicks teatro
    */

    $scope.clickedTeatro = function (click1) {

      if(click1==true){
        $scope.formClassTeatro = 'btn btn-sm purple-studio';
        $scope.formClassIconTeatro = 'fa fa-film';


        conttea = $scope.newEmpresa.subtags.length;

        $scope.newEmpresa.subtags[conttea] = "teatro";
        $scope.click1= false;
      }
      if(click1==false){
        $scope.formClassTeatro = 'btn btn-sm blue-steel';
        $scope.formClassIconTeatro = 'fa fa-plus';
        delete $scope.newEmpresa.subtags[conttea];
        $scope.click1 = true;
      }

    };
    $scope.clickedCine = function (click2) {

      if(click2==true){
        $scope.formClassCine = 'btn btn-sm purple-studio';
        $scope.formClassIconCine = 'fa fa-film';


          contcine = $scope.newEmpresa.subtags.length;

        $scope.newEmpresa.subtags[contcine] = "cine";
        $scope.click2= false;
      }
      if(click2==false){
        $scope.formClassCine = 'btn btn-sm blue-steel';
        $scope.formClassIconCine = 'fa fa-plus';
        delete $scope.newEmpresa.subtags[contcine];
        $scope.click2 = true;
      }

      console.log($scope.newEmpresa.subtags);
      console.log(contcine);

    };
    $scope.clickedParque = function (click3) {

      if(click3==true){
        $scope.formClassParque = 'btn btn-sm purple-studio';
        $scope.formClassIconParque = 'fa fa-film';


          contparq = $scope.newEmpresa.subtags.length;

        $scope.newEmpresa.subtags[contparq] = "parque";

        $scope.click3= false;
      }
      if(click3==false){
        $scope.formClassParque = 'btn btn-sm blue-steel';
        $scope.formClassIconParque = 'fa fa-plus';
        delete $scope.newEmpresa.subtags[contparq];
        $scope.click3 = true;
      }
console.log($scope.newEmpresa.subtags);
console.log(contparq);
    };
    $scope.clickedOtros = function (click4) {

      if(click4==true){
        $scope.formClassOtros = 'btn btn-sm purple-studio';
        $scope.formClassIconOtros = 'fa fa-film';

          contotr = $scope.newEmpresa.subtags.length;

        $scope.newEmpresa.subtags[contotr] = "otros"

        $scope.click4= false;
      }
      if(click4==false){
        $scope.formClassOtros = 'btn btn-sm blue-steel';
        $scope.formClassIconOtros = 'fa fa-plus';
        delete $scope.newEmpresa.subtags[contotr];
        $scope.click4 = true;
      }
console.log($scope.newEmpresa.subtags);
console.log(contotr);
    };


    $scope.clickedDisco = function (click1) {

      if(click1==true){
        $scope.formClassDisco = 'btn btn-sm grey-gallery';
        $scope.formClassIconDisco = 'fa fa-moon-o';


        contdisco = $scope.newEmpresa.subtags.length;

        $scope.newEmpresa.subtags[contdisco] = "discoteca";
        $scope.click1= false;
      }
      if(click1==false){
        $scope.formClassDisco = 'btn btn-sm blue-steel';
        $scope.formClassIconDisco = 'fa fa-plus';
        delete $scope.newEmpresa.subtags[contdisco];
        $scope.click1 = true;
      }

    };

    $scope.clickedCopas = function (click2) {

      if(click2==true){
        $scope.formClassCopas = 'btn btn-sm grey-gallery';
        $scope.formClassIconCopas = 'fa fa-moon-o';


        contcopas = $scope.newEmpresa.subtags.length;

        $scope.newEmpresa.subtags[contcopas] = "bar de copas";
        $scope.click2= false;
      }
      if(click2==false){
        $scope.formClassCopas = 'btn btn-sm blue-steel';
        $scope.formClassIconCopas = 'fa fa-plus';
        delete $scope.newEmpresa.subtags[contcopas];
        $scope.click2 = true;
      }

    };

    $scope.clickedGin = function (click3) {

      if(click3==true){
        $scope.formClassGin = 'btn btn-sm grey-gallery';
        $scope.formClassIconGin = 'fa fa-moon-o';


        contgin = $scope.newEmpresa.subtags.length;

        $scope.newEmpresa.subtags[contgin] = "gin tonic";
        $scope.click3= false;
      }
      if(click3==false){
        $scope.formClassGin = 'btn btn-sm blue-steel';
        $scope.formClassIconGin = 'fa fa-plus';
        delete $scope.newEmpresa.subtags[contgin];
        $scope.click3 = true;
      }

    };

    $scope.clickedCock = function (click4) {

      if(click4==true){
        $scope.formClassCock = 'btn btn-sm grey-gallery';
        $scope.formClassIconCock = 'fa fa-moon-o';


        contcock = $scope.newEmpresa.subtags.length;

        $scope.newEmpresa.subtags[contcock] = "cocketeles";
        $scope.click4= false;
      }
      if(click4==false){
        $scope.formClassCock = 'btn btn-sm blue-steel';
        $scope.formClassIconCock = 'fa fa-plus';
        delete $scope.newEmpresa.subtags[contcock];
        $scope.click4 = true;
      }

    };

    $scope.clickedAlt = function (click5) {

      if(click5==true){
        $scope.formClassAlt = 'btn btn-sm grey-gallery';
        $scope.formClassIconAlt = 'fa fa-moon-o';


        contalt = $scope.newEmpresa.subtags.length;

        $scope.newEmpresa.subtags[contalt] = "alterne";
        $scope.click5= false;
      }
      if(click5==false){
        $scope.formClassAlt = 'btn btn-sm blue-steel';
        $scope.formClassIconAlt = 'fa fa-plus';
        delete $scope.newEmpresa.subtags[contalt];
        $scope.click5 = true;
      }

    };

    $scope.detallesComida = function (comida) {
      $scope.mostrarDetalleComida = true;
      $scope.mostrarDetalleDiversion = false;
      $scope.mostrarDetalleNocturno = false;
      $scope.mostrarDetalleCompras = false;

      $scope.mostrarSubtagsComida = true;
      $scope.mostrarSubtagsDiversion = false;
      $scope.mostrarSubtagsNocturno = false;

      $scope.newEmpresa.tag = "comida";

    };

    $scope.detallesDiversion = function (diversion) {
      $scope.mostrarDetalleDiversion = true;
      $scope.mostrarDetalleComida = false;
      $scope.mostrarDetalleNocturno = false;
      $scope.mostrarDetalleCompras = false;

      $scope.mostrarSubtagsDiversion = true;
      $scope.mostrarSubtagsComida = false;
      $scope.mostrarSubtagsNocturno = false;

      $scope.newEmpresa.tag = "diversion";

    };

    $scope.detallesNocturno = function (nocturno) {
      $scope.mostrarDetalleNocturno = true;
      $scope.mostrarDetalleComida = false;
      $scope.mostrarDetalleDiversion = false;
      $scope.mostrarDetalleCompras = false;

      $scope.mostrarSubtagsDiversion = false;
      $scope.mostrarSubtagsComida = false;
      $scope.mostrarSubtagsNocturno = true;

      $scope.newEmpresa.tag = "nocturno";


    };

    $scope.detallesCompras = function (compras) {
      $scope.mostrarDetalleCompras = true;
      $scope.mostrarDetalleComida = false;
      $scope.mostrarDetalleDiversion = false;
      $scope.mostrarDetalleNocturno = false;


    };

  //  function codeAddress(address) {


    //}


    $scope.registrarEmpresa = function () {
        if($scope.newEmpresa.tag == "comida"){

          numeroAv = Math.floor(Math.random() * 9);
          $scope.newEmpresa.avatar = "/assets/avatar_emp/comida"+numeroAv+".jpg";
        } else if($scope.newEmpresa.tag == "diversion"){
          numeroAv = Math.floor(Math.random() * 2);
          $scope.newEmpresa.avatar = "/assets/avatar_emp/diversion"+numeroAv+".jpg";
        }else if($scope.newEmpresa.tag == "nocturno"){

            numeroAv = Math.floor(Math.random() * 5);
            $scope.newEmpresa.avatar = "/assets/avatar_emp/nocturno"+numeroAv+".jpg";

          }else if($scope.newEmpresa.tag == "compras"){
            numeroAv = Math.floor(Math.random() * 4);
            $scope.newEmpresa.avatar = "/assets/avatar_emp/compras"+numeroAv+".jpg";
          }




      
  //        codeAddress($scope.newEmpresa.direccion);
          geocoder = new google.maps.Geocoder();
            geocoder.geocode({address: $scope.newEmpresa.direccion}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                  $scope.newEmpresa.location = [results[0].geometry.location.lat(),results[0].geometry.location.lng()];
                  $scope.newEmpresa.detalles.horario = $scope.todos + $scope.entre + $scope.fines + $scope.manyanas + $scope.tardes + $scope.ambos;
                  console.log($scope.newEmpresa);
                  $http.post('/empresa', $scope.newEmpresa)
                      .success(function () {

                          $scope.newEmpresa = {};
                          $state.go('index');

                      })
                      .error(function (data) {
                          console.log('Error: ' + data);
                          $scope.error = "Las contraseñas no coinciden";

                      });


                } else {
                    alert('EL Geocoder no funciona por la siguiente razón:  ' + status);
                }
            });

    };



    $scope.volver = function () {
        $state.go('index');
    };

});

var geocoder;



function initMap() {
    geocoder = new google.maps.Geocoder();


}
