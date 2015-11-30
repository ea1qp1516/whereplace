angular.module('app.services', [])

.factory('Gustos', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var gustos = [{
    id: 0,
    name: 'Bares'
  }, {
    id: 1,
    name: 'Restaurantes'
  }, {
    id: 2,
    name: 'Discotecas'
  }, {
    id: 3,
    name: 'Teatro'
  }, {
    id: 4,
    name: 'Cines'
  },{
    id: 5,
    name: 'Cafeterías'
    }];

  return {
    all: function() {
      return gustos;
    }
  };
});

