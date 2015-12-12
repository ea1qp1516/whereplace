angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('registro', {
    url: '/registro1',
    templateUrl: 'templates/registro.html',
    controller: 'registroCtrl'
  })

  .state('usuario', {
    url: '/registrouser',
    templateUrl: 'templates/usuario.html',
    controller: 'usuarioCtrl'
  })

  .state('empresa', {
    url: '/registroempresa',
    templateUrl: 'templates/empresa.html',
    controller: 'empresaCtrl'
  })

  .state('empresas', {
    url: '/empresas',
    params: {'empresas':{}},
    templateUrl: 'templates/empresas.html',
    controller: 'empresasCtrl'
  })

  .state('gustos', {
    url: '/gustos',
    templateUrl: 'templates/queBuscas.html',
    params: {'user':{}},
    controller: 'gustosCtrl'
  })

  .state('resultadoBusqueda', {
    url: '/resultado',
    params: {'empresas':{}},
    templateUrl: 'templates/resultadoBusqueda.html',
    controller: 'resultadoBusquedaCtrl'
  })

  .state('tipoDeNegocio', {
    url: '/tags',
    templateUrl: 'templates/tipoDeNegocio.html',
    controller: 'tipoDeNegocioCtrl'
  })

  .state('loginPost', {
    url: '/login',
    templateUrl: 'templates/signup.html',
    controller: 'loginPost'
  })

  .state('googleMaps', {
    url: '/gmaps',
    templateUrl: 'templates/googleMaps.html',
    controller: 'googleMapsCtrl'
  })

.state('perfilusuario', {
    url: '/perfilusuario',
    templateUrl: 'templates/perfilusuario.html',
    controller: 'perfilusuarioCtrl'
  })

.state('favoritos', {
    url: '/favoritos',
    templateUrl: 'templates/favoritos.html',
    controller: 'favoritosCtrl'
  })

.state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl'
  })

.state('about', {
    url: '/about',
    templateUrl: 'templates/about.html',
    controller: 'aboutCtrl'
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
