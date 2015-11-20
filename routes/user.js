

module.exports = function(app) {


    var User = require('../modelos/user');
    // Obtiene un Usuario de la base de datos
    getUser = function (req, res) {
        console.log(req);
        User.findOne({"_id":req.params.user_id},function (err, user) {
                if (err)
                    res.send(err)
                res.json(user); // devuelve el user seleccionado/home/urtasun/WebstormProjects/whereplace/modelos/empresa.js
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
        User.create(
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
                User.find(function (err, user) {
                    if (err)
                        res.send(err)
                    res.json(user);
                });
            });

    }

    userlogin = function(req,res)
    {
        console.log(req.body);
        User.findOne({"username":req.body.username},function (err, user) {
                console.log(user.password);
                if (err)
                    res.send(err)
                if(req.body.password == user.password){
                    console.log("logIN OK");
                    res.json(user);
                }
                else
                    res.send("LogIN FAIL");
                    console.log("LOGIN FAIL");

                // devuelve el user seleccionado/home/urtasun/WebstormProjects/whereplace/modelos/empresa.js
            }
        );
    }



    app.get('/user/:user_id', getUser);
    app.get('/user', getUsers);
    app.post('/user', newUser);
    app.post('/user/login', userlogin);
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // Carga única de la vista
    });
};


