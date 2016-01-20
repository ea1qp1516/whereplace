var url = "http://10.183.44.133:3000";

//10.83.55.226
//localhost
//192.168.1.109

angular.module('your_app_name.controllers', [])

  .controller('AuthCtrl', function ($scope, $ionicConfig, $state) {

      var user = JSON.parse(window.localStorage['user'] || '{}');
      console.log(user.nombre);
      window.localStorage['radio'] = "1";


      if (user.nombre != undefined){

        $state.go('app.feeds-categories', {user: user});
      }

    })

// APP
  .controller('AppCtrl', function ($scope, $ionicConfig, $state) {
    $scope.url = url;
    var user = JSON.parse(window.localStorage['user'] || '{}');
    console.log(user);
    $scope.user = user;
    })
  .controller('ProfileCtrl', function ($scope, $ionicConfig,  $cordovaCamera, $ionicActionSheet, $cordovaFileTransfer, $rootScope, $timeout) {

    var user = JSON.parse(window.localStorage['user'] || '{}');
    console.log(user);
    $scope.user = user;

      $scope.cambiarPhoto = function(){


        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {

          $timeout(function () {
            $scope.$apply(function () {
              $scope.fotoperfil = imageData;
            });
          });

          var url = "http://10.183.44.133:3000/user/modify_avatar/"+user._id;
          var targetPath = imageData;
          var filename = user._id;
          var options = {
            fileKey: "avatar",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpg"
          };

          $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
            alert("Foto subida correctamente");
          }, function (err) {
            alert(JSON.stringify(err));
          }, function (progress) {

          });


        }, function (err) {
          // error
          console.log(err);
        });

      }

  })

//LOGIN
  .controller('LoginCtrl', function ($scope, $state, $templateCache, $q, $rootScope, $http) {

    $scope.doLogIn = function () {
      var login ={
        username : $scope.user.username,
        password : $scope.user.password
      };

      var config = ({headers: {'Content-Type' : 'application/json'}});
      $http.post(url + '/user/login', login, config)
        .success(function (data) {
          console.log(data);
          window.localStorage['user'] = JSON.stringify(data);

          $state.go('app.feeds-categories', {user: data});
        })
    };

    $scope.user = {};

    $scope.user.email = "";

    // We need this for the form validation
    $scope.selected_tab = "";

    $scope.$on('my-tabs-changed', function (event, data) {
      $scope.selected_tab = data.title;
    });

  })

  .controller('SignupCtrl', function ($scope, $state, $http) {
    $scope.user = {};

    $scope.user.email = "";

    $scope.doSignUp = function (user) {
      var config = {};
      $http.post(url + '/user/find',user,config)
          .success(function (data) {
            if (data[0]==undefined){
              $scope.formClass = "ion-checkmark";
              $state.go('auth.registrar', {user:user});

            }else{
              $scope.formClass = "ion-close";
            }

          })

    };
  })
  .controller('RegistrarCtrl', function ($scope, $state, $http, $stateParams) {
      $scope.user = $stateParams.user;
      $scope.user.password = "";
      $scope.doSignUp = function (user) {
        if (user.password != user.repassword) {
          $scope.formClass1 = "ion-close";
          $scope.formClass2 = "ion-close";
          console.log(user);

        } else {
          var numeroAv = Math.floor(Math.random() * 12) ;

          var newuser = {
            email : user.email,
            nombre : user.nombre,
            apellidos: user.apellidos,
            password: user.password,
            fecha_nacimiento: user.fecha_nacimiento,
            avatar : "/assets/avatar/"+numeroAv+".png"
          }
          console.log(newuser);
          $http.post(url + '/user', newuser)
              .success(function (data) {
                window.localStorage['user'] = JSON.stringify(data);
                $state.go('app.feeds-categories', {user: data});

              })

        }
        ;
      }
  })

  .controller('ForgotPasswordCtrl', function ($scope, $state) {
    $scope.recoverPassword = function () {
      $state.go('app.feeds-categories');
    };

    $scope.user = {};
  })

  .controller('RateApp', function ($scope) {
    $scope.rateApp = function () {
      if (ionic.Platform.isIOS()) {
        //you need to set your own ios app id
        AppRate.preferences.storeAppURL.ios = '1234555553>';
        AppRate.promptForRating(true);
      } else if (ionic.Platform.isAndroid()) {
        //you need to set your own android app id
        AppRate.preferences.storeAppURL.android = 'market://details?id=ionFB';
        AppRate.promptForRating(true);
      }
    };
  })

  .controller('SendMailCtrl', function ($scope) {
    $scope.sendMail = function () {
      cordova.plugins.email.isAvailable(
        function (isAvailable) {
          // alert('Service is not available') unless isAvailable;
          cordova.plugins.email.open({
            to: 'envato@startapplabs.com',
            cc: 'hello@startapplabs.com',
            // bcc:     ['john@doe.com', 'jane@doe.com'],
            subject: 'Greetings',
            body: 'How are you? Nice greetings from IonFullApp'
          });
        }
      );
    };
  })

  .controller('MapsCtrl', function ($scope, $ionicLoading, $stateParams) {
    console.log($stateParams.empresa);
    $scope.nombre = $stateParams.empresa.nombre;
    $scope.descripcion = $stateParams.empresa.descripcion;

    $scope.info_position = {
      lat: {},
      lng: {}
    };


    $scope.my_location = "";

    $scope.$on('mapInitialized', function (event, map) {
      geocoder = new google.maps.Geocoder();
      $scope.map = map;
      codeAddress($stateParams.empresa.direccion);
    });

    function codeAddress(address) {
      geocoder.geocode({address: address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          $scope.map.setCenter(results[0].geometry.location);//center the map over the result
          //place a marker at the location
          $scope.info_position.lat = results[0].geometry.location.lat();
          $scope.info_position.lng = results[0].geometry.location.lng();
        }
      });
    }

  })


// FEED
//brings all feed categories
  .controller('FeedsCategoriesCtrl', function ($scope, $http, $state) {
    $scope.feeds_categories = [];

    $http.get('feeds-categories.json').success(function (response) {
      $scope.feeds_categories = response;
    });



    $scope.getEmpresas = function(gusto){

      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      });


      var user = JSON.parse(window.localStorage['user'] || '{}');
      var radio = window.localStorage['radio'] || '1';

      if (gusto =="Mis Gustos"){
        console.log("misgustos");
        var mis_gustos = user.gustos;
        var jsgusto = {
          gusto : mis_gustos
        }
        console.log(jsgusto);
        $http.post(url + '/empresas?count=20&longitude=41.275626&latitude=1.985223&distance='+radio, jsgusto).success(function (empresas) {

          $state.go('app.category-feeds',{empresas:empresas.results});

        });
      }
      else if(gusto =="Busqueda Personalizada"){

        console.log("personaizada");

        $http.get(url + '/empresas?count=20&longitude=41.275626&latitude=1.985223&distance='+radio).success(function (empresas) {

          $state.go('app.category-feeds',{empresas:empresas.results});

        });

      }
      else{
        console.log("otra");

        gusto = gusto.toLowerCase();
        var arrgusto = [];
        arrgusto.push(gusto)
        var jsgusto ={
          gusto: arrgusto
        }
        $http.post(url + '/empresas?count=20&longitude=41.275626&latitude=1.985223&distance='+radio,jsgusto).success(function (empresas) {

          $state.go('app.category-feeds', {empresas: empresas.results});

        });
      }

    }
  })

//bring specific category providers
  .controller('CategoryFeedsCtrl', function ($scope, $http, $stateParams, $state, $ionicHistory) {

    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    $scope.empresas = $stateParams.empresas;
    window.localStorage['empresas'] = JSON.stringify($scope.empresas);


    $scope.category_sources = [];

    $scope.categoryId = $stateParams.categoryId;

    $http.get('feeds-categories.json').success(function (response) {
      var category = _.find(response, {id: $scope.categoryId});
    });

      $scope.loadMoreData = function(){

      }



    $scope.buscar = function(busqueda){

      var empresas = JSON.parse(window.localStorage['empresas'] || '{}');

      var matches = [];


      empresas.forEach(function(empresa){
        if((empresa.nombre.search(busqueda)!=-1)||(empresa.subtags.indexOf(busqueda)!=-1)){
          matches.push(empresa);
        }
      })
      $scope.empresas = matches;



    }

    $scope.detailEmpresa = function (idempresa) {

      $http.get(url + '/empresa/' + idempresa).success(function (empresa) {
        $state.go("app.feed-entries", {empresa: empresa});


      });
    };

  })

//this method brings posts for a source provider
  .controller('FeedEntriesCtrl', function ($scope, $state, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService, $ionicHistory) {
    var user = JSON.parse(window.localStorage['user'] || '{}');
    $scope.id = user._id;

    console.log(user);

    var empresaEntrada = $stateParams.empresa;
    console.log(empresaEntrada);

    $scope.empresa = empresaEntrada;
    $scope.formClass = 'icon ion-ios-star-outline';
    $scope.favorito = false;


    $scope.puntuaciones={};
    $scope.puntuaciones_iniciales = {};
    $scope.media={};
    var puntuacion_total = 0;

    $http.get(url + '/empresa/' + $stateParams.empresa._id).success(function (data) {
      console.log(data);
      $scope.puntuaciones_iniciales = data.puntuaciones;
      var i;
      for(i=0; i<$scope.puntuaciones_iniciales.length;i++){
        puntuacion_total = puntuacion_total + $scope.puntuaciones_iniciales[i].puntuacion;
      }

      $scope.media = ((puntuacion_total/$scope.puntuaciones_iniciales.length).toFixed(2))*2;

    })
      .error(function (data) {
        console.log('Error: ' + data);
      });


    user.favoritos.forEach(function (empresa) {
      if (empresa._id == empresaEntrada._id) {
        $scope.favorito = true;
        $scope.formClass = 'icon ion-ios-star';
      }
    })


    $scope.NewComment = function () {
      console.log($scope.empresa);
      $state.go("app.newComment", {empresa: $scope.empresa});
    }
    $scope.cargarMapa = function () {
      $state.go("app.maps", {empresa: $scope.empresa});

    }


    $scope.changing = function (favorito) {
      if (favorito == true) {
        $scope.formClass = 'icon ion-ios-star-outline';
        $scope.favorito = false;
        var favSend = {
          user_id: user._id,
          function: 'drop',
          empresa: empresaEntrada
        }
        $http.post(url + '/user/favorito', favSend).success(function (response) {
          window.localStorage['user'] = JSON.stringify(response);

        });
      }
      if (favorito == false) {
        $scope.formClass = 'icon ion-ios-star';
        $scope.favorito = true;
        var favSend = {
          user_id: user._id,
          function: 'add',
          empresa: empresaEntrada
        }
        $http.post(url + '/user/favorito', favSend).success(function (response) {

          window.localStorage['user'] = JSON.stringify(response);

        });
      }
      console.log($scope.favorito);
    }
    $scope.goPhotos = function(empresa){

      $state.go("app.feed-entries.photos",{empresa:$scope.empresa});

    }
    $scope.goComments = function(empresa){

      $state.go("app.feed-entries.comments",{empresa:$scope.empresa});

    }
    $scope.goHome = function(empresa){
      $state.go("app.feed-entries",{empresa:$scope.empresa});
    }

    $scope.puntuar = function (puntuacion) {


      $scope.puntuaciones.puntuacion = puntuacion;
      $scope.puntuaciones.userID = user._id;



      $http.post(url + '/empresa/' + $scope.empresa._id + '/rating', $scope.puntuaciones).success(function (response) {
        console.log(response);
        console.log(response.puntuaciones[response.puntuaciones.length-1].puntuacion);
        puntuacion_total = response.puntuaciones[response.puntuaciones.length-1].puntuacion + puntuacion_total;

        $scope.media = ((puntuacion_total/response.puntuaciones.length).toFixed(2))*2;
      });

    };


  })
    .controller('NewCommentCtrl', function ($scope, $state, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService, $ionicHistory) {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    console.log($stateParams.empresa);
    var empresa = $stateParams.empresa;
    $scope.id = empresa._id;
    console.log($scope.id);
    var user = JSON.parse(window.localStorage['user'] || '{}');
    $scope.user = user;
    $scope.commentario = "";


    $scope.newComment = function (commentario, id) {

      var comentario = {
        comentario: commentario,
        user: user.nombre + " " + user.apellidos,
        user_id: user._id
      }
      console.log(comentario);
      console.log($scope.commentario);
      console.log(id);

      $http.post(url + '/empresa/' + id + '/comment', comentario).success(function (response) {
        console.log(response);
        $state.go("app.feed-entries", {empresa: response});
      });


    };


  })

// SETTINGS
  .controller('SettingsCtrl', function ($scope, $ionicActionSheet, $state, $ionicHistory, $http, $ionicPopup) {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });

      $scope.CambiarPassword = function(password){


        if (password.new == password.renew){
          var user = JSON.parse(window.localStorage['user'] || '{}');


          var change_password = {
              password : password.new,
              last : password.last
          }
          $http.post(url + '/user/modify/' + user._id , change_password)
              .success(function (response) {

                var alertPopup = $ionicPopup.alert({
                  title: 'Contraseña cambiada correctamente'
                });

                alertPopup.then(function(res) {

                });
              })
              .error(function(response,status){
                var alertPopup = $ionicPopup.alert({
                  title: 'Contraseña antigua incorrecta',
                  template: 'Introduzca la contraseña correcta, porfavor'
                });

                alertPopup.then(function(res) {


                });
              });

        }

      }
      $scope.choice = "1";
      $scope.getradio = function(radio){
        console.log(radio);
        window.localStorage['radio'] = radio;

      }
    // Triggered on a the logOut button click

    $scope.showLogOutMenu = function () {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        //Here you can add some more buttons
        // buttons: [
        // { text: '<b>Share</b> This' },
        // { text: 'Move' }
        // ],
        destructiveText: 'Logout',
        titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
        cancelText: 'Cancel',
        cancel: function () {
          // add cancel code..
        },
        buttonClicked: function (index) {
          //Called when one of the non-destructive buttons is clicked,
          //with the index of the button that was clicked and the button object.
          //Return true to close the action sheet, or false to keep it opened.
          return true;
        },
        destructiveButtonClicked: function () {
          //Called when the destructive button is clicked.
          //Return true to close the action sheet, or false to keep it opened.
          window.localStorage['user'] = "";

          $state.go('auth.walkthrough');
        }
      });

    };
  })

// TINDER CARDS
  .controller('CommentsCtrl', function ($scope, $http, $state, $ionicHistory) {

    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    var user = JSON.parse(window.localStorage['user'] || '{}');

    $http.get(url + '/empresas/comentarios/' + user._id).success(function (response) {
      console.log(response);
      $scope.empresas = response.results;
      $scope.numComments = response.length;
    });
    $scope.detailEmpresa = function (idempresa) {

      $http.get(url + '/empresa/' + idempresa).success(function (empresa) {

        $state.go("app.feed-entries", {empresa: empresa});


      });
    };


  })
  .controller('FavoritosCtrl', function ($scope, $http, $state, $ionicHistory) {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    var user = JSON.parse(window.localStorage['user'] || '{}');

    $http.get(url + '/user/' + user._id).success(function (response) {
      var user = response;
      console.log(user);
      $scope.empresas = user.favoritos;
      $scope.numFavoritos = user.favoritos.length;

      window.localStorage['user'] = JSON.stringify(response);
    });
    $scope.detailEmpresa = function (idempresa) {

      $http.get(url + '/empresa/' + idempresa).success(function (empresa) {

        $state.go("app.feed-entries", {empresa: empresa});


      });
    };


  })


// BOOKMARKS
  .controller('GustosCtrl', function ($scope, $rootScope, BookMarkService, $state, $http, $ionicHistory) {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    var user = JSON.parse(window.localStorage['user'] || '{}');

    $http.get(url + '/user/' + user._id).success(function (response) {
      window.localStorage['user'] = JSON.stringify(response);
    });


    var user = JSON.parse(window.localStorage['user'] || '{}');
    var gustos = user.gustos;


    console.log(gustos);
    var comida;
    var diversion;
    var nocturno;
    var compras;
    gustos.forEach(function (gusto) {
      console.log(gusto);
      if (gusto == "comida") {
        comida = true;
      }
      if (gusto == "diversion") {
        diversion = true;
      }
      if (gusto == "nocturno") {
        nocturno = true;
      }
      if (gusto == "compras") {
        compras = true;
      }
    })

    $scope.comida = comida;
    $scope.diversion = diversion;
    $scope.nocturno = nocturno;
    $scope.compras = compras;


    $scope.actualizar = function (gustos) {
      var gustosArray = [];
      if (gustos.comida == true) {
        gustosArray.push("comida");
      }
      if (gustos.diversion == true) {
        gustosArray.push("diversion");
      }
      if (gustos.nocturno == true) {
        gustosArray.push("nocturno");
      }
      if (gustos.compras == true) {
        gustosArray.push("compras");
      }
      var gustoTag = {
        gustos: gustosArray
      }
      $http.post(url + '/user/modify/' + user._id, gustoTag).success(function (response) {
        console.log(response);
        window.localStorage['user'] = JSON.stringify(response);
        var user = JSON.parse(window.localStorage['user'] || '{}');
        console.log(user);
        $state.go("app.feeds-categories");
      });
    }


  })

  .controller('DetallesController', function ($scope, $http, $stateParams) {

    $scope.empresa = {};
    $scope.newComment = {};
    $scope.newPuntuacion = {};
    $scope.NoPuedes = {};
    $scope.mostrarEstrellas = true;
    $scope.mostrarMensaje = false;
    //userPuntuador = $cookieStore.get('IdUser');
    console.log(userPuntuador);


    $http.get('/empresa/' + $stateParams.empresa_id).success(function (data) {

      $scope.empresa = data;
      direccion = $scope.empresa.direccion;
      contador = $scope.empresa.puntuacion.contador;
      calificacion = $scope.empresa.puntuacion.puntuacion;
      if (contador == null && calificacion == null) {
        contador = 0;
        calificacion = 0;
      }
      users = $scope.empresa.puntuacion.users;
      console.log(users.length);

    })
      .error(function (data) {
        console.log('Error: ' + data);
      });

    $scope.nuevoComentario = function () {

      // $scope.newComment.user = $cookieStore.get('Name') + " " + $cookieStore.get('Apellidos');
      //$scope.newComment.avatar = $cookieStore.get('Avatar');
      console.log($scope.newComment);
      $http.post('/empresa/' + $stateParams.empresa_id + '/comment', $scope.newComment)
        .success(function (data) {

          $scope.empresa.comentarios = data.comentarios;
          $scope.newComment = {};

        })
        .error(function (data) {
          console.log('Error: ' + data);
        });
    };



  })


// WORDPRESS
  .controller('WordpressCtrl', function ($scope, $http, $ionicLoading, PostService, BookMarkService) {
    $scope.posts = [];
    $scope.page = 1;
    $scope.totalPages = 1;

    $scope.doRefresh = function () {
      $ionicLoading.show({
        template: 'Loading posts...'
      });

      //Always bring me the latest posts => page=1
      PostService.getRecentPosts(1)
        .then(function (data) {
          $scope.totalPages = data.pages;
          $scope.posts = PostService.shortenPosts(data.posts);

          $ionicLoading.hide();
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.loadMoreData = function () {
      $scope.page += 1;

      PostService.getRecentPosts($scope.page)
        .then(function (data) {
          //We will update this value in every request because new posts can be created
          $scope.totalPages = data.pages;
          var new_posts = PostService.shortenPosts(data.posts);
          $scope.posts = $scope.posts.concat(new_posts);

          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.moreDataCanBeLoaded = function () {
      return $scope.totalPages > $scope.page;
    };

    $scope.bookmarkPost = function (post) {
      $ionicLoading.show({template: 'Post Saved!', noBackdrop: true, duration: 1000});
      BookMarkService.bookmarkWordpressPost(post);
    };

    $scope.doRefresh();
  })

// WORDPRESS POST
  .controller('WordpressPostCtrl', function ($scope, post_data, $ionicLoading) {

    $scope.post = post_data.post;
    $ionicLoading.hide();

    $scope.sharePost = function (link) {
      window.plugins.socialsharing.share('Check this post here: ', null, null, link);
    };
  })


  .controller('ImagePickerCtrl', function ($rootScope, $scope, $cordovaCamera, $ionicActionSheet, $cordovaFileTransfer) {
      ionic.Platform.ready(function(){
      });


      $scope.selImages = function () {
        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {

          $timeout(function () {
            $scope.$apply(function () {
              $scope.fotoperfil = imageData;
            });
          });

          $scope.EnviarFoto = function () {
            $rootScope.showLoading("Subiendo foto...");
            var url = "http://bareando.tk/datos_usuarios/photo.php";
            var targetPath = imageData;
            var filename = $rootScope.usernameRegistro;
            var options = {
              fileKey: "file",
              fileName: filename,
              chunkedMode: false,
              mimeType: "image/jpg"
            };

            $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
              $rootScope.hideLoading();
              alert("Foto subida correctamente");
              $state.go('paginaPrincipal');
            }, function (err) {
              $rootScope.hideLoading();
              alert(JSON.stringify(err));
            }, function (progress) {
              // constant progress updates
              /*$timeout(function () {
               $scope.downloadProgress = (progress.loaded / progress.total) * 100;
               })*/
            });
          }

        }, function (err) {
          // error
          console.log(err);
        });
      };

  })
;
