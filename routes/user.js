
module.exports = function(app) {


    var User = require('../modelos/user.js');
    // Obtiene un Usuario de la base de datos
    getUser = function (req, res) {
        user.findOne({"_id":req.params._id},function (err, user) {
                if (err)
                    res.send(err)
                res.json(user); // devuelve el user seleccionado
            }
        );
    }
// Obtiene todos los objetos Usuarios de la base de datos
    getUsers = function (req, res) {
        console.log("HELOO");
        User.find(function (err, users) {
                if (err)
                    res.send(err)
                res.json(users); // devuelve todos los Users en JSON
            }
        );
    }

// Guarda un objeto Empresa en base de datos
    newUser = function (req, res) {

        // Creo el objeto Empresa
        user.create(
            {
                username: req.body.username,
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                email: req.body.email,
                password: req.body.password,
                genero:req.body.genero,
                edad: req.body.edad,
                gustos: req.body.gustos
            },
            function (err, user) {
                if (err)
                    res.send(err);
                // Obtine y devuelve todas las routes tras crear una de ellas
                Empresa.find(function (err, user) {
                    if (err)
                        res.send(err)
                    res.json(user);
                });
            });

    }

    userlogin = function(req,res)
    {

    }


    // devolver todos los Empresas
    app.get('/user/:user_id', getUser);
    // Crear una nueva Empresa
    app.get('/user', getUsers);
    // Modificar los datos de una Empresa
    app.post('/user', newUser);
    // Borrar una Empresa
    app.post('/user/login', userlogin);
    // application
    /*app.get('*', function(req, res) {
        res.sendfile('./public/index2.html'); // Carga única de la vista
    });*/
};


