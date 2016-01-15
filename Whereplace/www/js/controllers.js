var url = "http://10.83.21.191:3000";

//10.83.55.226
//localhost
//192.168.1.109

angular.module('your_app_name.controllers', [])

  .controller('AuthCtrl', function ($scope, $ionicConfig) {

  })

// APP
  .controller('AppCtrl', function ($scope, $ionicConfig) {

    var user = JSON.parse(window.localStorage['user'] || '{}');
    console.log(user);
    $scope.user = user;

  })
  .controller('ProfileCtrl', function ($scope, $ionicConfig) {

    var user = JSON.parse(window.localStorage['user'] || '{}');
    console.log(user);
    $scope.user = user;

  })

//LOGIN
  .controller('LoginCtrl', function ($scope, $state, $templateCache, $q, $rootScope, $http) {

    $scope.doLogIn = function () {
      $http.post(url + '/user/login', $scope.user)
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

  .controller('SignupCtrl', function ($scope, $state) {
    $scope.user = {};

    $scope.user.email = "";

    $scope.doSignUp = function () {
      $state.go('app.feeds-categories');
    };
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

  .controller('AdsCtrl', function ($scope, $ionicActionSheet, AdMob, iAd) {

    $scope.manageAdMob = function () {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        //Here you can add some more buttons
        buttons: [
          {text: 'Show Banner'},
          {text: 'Show Interstitial'}
        ],
        destructiveText: 'Remove Ads',
        titleText: 'Choose the ad to show',
        cancelText: 'Cancel',
        cancel: function () {
          // add cancel code..
        },
        destructiveButtonClicked: function () {
          console.log("removing ads");
          AdMob.removeAds();
          return true;
        },
        buttonClicked: function (index, button) {
          if (button.text == 'Show Banner') {
            console.log("show banner");
            AdMob.showBanner();
          }

          if (button.text == 'Show Interstitial') {
            console.log("show interstitial");
            AdMob.showInterstitial();
          }

          return true;
        }
      });
    };

    $scope.manageiAd = function () {

      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        //Here you can add some more buttons
        buttons: [
          {text: 'Show iAd Banner'},
          {text: 'Show iAd Interstitial'}
        ],
        destructiveText: 'Remove Ads',
        titleText: 'Choose the ad to show - Interstitial only works in iPad',
        cancelText: 'Cancel',
        cancel: function () {
          // add cancel code..
        },
        destructiveButtonClicked: function () {
          console.log("removing ads");
          iAd.removeAds();
          return true;
        },
        buttonClicked: function (index, button) {
          if (button.text == 'Show iAd Banner') {
            console.log("show iAd banner");
            iAd.showBanner();
          }
          if (button.text == 'Show iAd Interstitial') {
            console.log("show iAd interstitial");
            iAd.showInterstitial();
          }
          return true;
        }
      });
    };
  })

// FEED
//brings all feed categories
  .controller('FeedsCategoriesCtrl', function ($scope, $http) {
    $scope.feeds_categories = [];

    $http.get('feeds-categories.json').success(function (response) {
      $scope.feeds_categories = response;
    });
  })

//bring specific category providers
  .controller('CategoryFeedsCtrl', function ($scope, $http, $stateParams, $state) {
    $scope.category_sources = [];

    $scope.categoryId = $stateParams.categoryId;

    $http.get('feeds-categories.json').success(function (response) {
      var category = _.find(response, {id: $scope.categoryId});
    });

    $http.get(url + '/empresas/' + $stateParams.categoryId).success(function (empresas) {

      $scope.empresas = empresas;

    });
    $scope.detailEmpresa = function (idempresa) {

      $http.get(url + '/empresa/' + idempresa).success(function (empresa) {

        $state.go("app.feed-entries", {empresa: empresa});


      });
    };
  })

//this method brings posts for a source provider
  .controller('FeedEntriesCtrl', function ($scope, $state, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService) {

    var user = JSON.parse(window.localStorage['user'] || '{}');
    $scope.id = user._id;

    var empresaEntrada = $stateParams.empresa;
    var idempresa = empresaEntrada._id;
    console.log($stateParams.empresa);
    $scope.empresa = empresaEntrada;
    $scope.favorito = false;
    $scope.formClass = 'icon ion-ios-star-outline';
    $scope.puntuaciones={};
    $scope.puntuaciones_iniciales = {};
    $scope.media={};
    var puntuacion_total = 0;

    $http.get(url + '/empresa/' + $stateParams.empresa._id).success(function (data) {

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

        });
      }
      console.log(favorito);
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

  .controller('NewCommentCtrl', function ($scope, $state, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService) {
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
  .controller('SettingsCtrl', function ($scope, $ionicActionSheet, $state) {
    $scope.airplaneMode = true;
    $scope.wifi = false;
    $scope.bluetooth = true;
    $scope.personalHotspot = true;

    $scope.checkOpt1 = true;
    $scope.checkOpt2 = true;
    $scope.checkOpt3 = false;

    $scope.radioChoice = 'B';

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
          $state.go('auth.walkthrough');
        }
      });

    };
  })

// TINDER CARDS
  .controller('CommentsCtrl', function ($scope, $http, $state) {

    var user = JSON.parse(window.localStorage['user'] || '{}');

    $http.get(url + '/empresas/comentarios/' + user._id).success(function (response) {
      console.log(response);
      $scope.empresas = response;
      $scope.numComments = response.length;
    });
    $scope.detailEmpresa = function (idempresa) {

      $http.get(url + '/empresa/' + idempresa).success(function (empresa) {

        $state.go("app.feed-entries", {empresa: empresa});


      });
    };


  })
  .controller('FavoritosCtrl', function ($scope, $http, $state) {

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
  .controller('GustosCtrl', function ($scope, $rootScope, BookMarkService, $state, $http) {

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


  .controller('ImagePickerCtrl', function ($scope, $rootScope, $cordovaCamera) {


    $scope.selImages = function () {
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
        encodingType: 0     // 0=JPG 1=PNG
      }
      navigator.camera.getPicture(onSuccess, onFail, options);
    }
    var onSuccess = function (FILE_URI) {
      console.log(FILE_URI);
      $scope.picData = FILE_URI;
      $scope.$apply();
    };
    var onFail = function (e) {
      console.log("On fail " + e);
    }
    $scope.send = function () {
      var myImg = $scope.picData;
      var options = new FileUploadOptions();
      options.fileKey = "post";
      options.chunkedMode = false;
      var params = {};
      params.user_token = localStorage.getItem('auth_token');
      params.user_email = localStorage.getItem('email');
      options.params = params;
      var ft = new FileTransfer();
      ft.upload(myImg, encodeURI("https://example.com/posts/"), onUploadSuccess, onUploadFail, options);
    }

  })

;
