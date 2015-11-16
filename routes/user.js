
var user = require('././user');
var Controller = require ('./controller');




module.exports = function(app) {

    // devolver todos los Empresas
    app.get('/user/:user_id', Controller.getUser);
    // Crear una nueva Empresa
    app.get('/user', Controller.getUsers);
    // Modificar los datos de una Empresa
    app.post('/user', Controller.newUser);
    // Borrar una Empresa
    app.post('/user/login', Controller.userlogin);
    // application
    /*app.get('*', function(req, res) {
        res.sendfile('./public/index2.html'); // Carga única de la vista
    });*/
};


