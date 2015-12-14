var crypto = require('crypto');
var randtoken = require('rand-token');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



module.exports = function(app) {

    var User = require('../modelos/user');
    var Empresa = require('../modelos/empresa');
    // Obtiene un Usuario de la base de datos
    getUser = function (req, res) {
        User.findOne({"_id":req.params.user_id},{nombre:1,apellidos:1,email:1,favoritos:1,gustos:1},function (err, user) {
                if (err)
                    res.send(err)
                res.json(user); // devuelve el user seleccionado/home/urtasun/WebstormProjects/whereplace/modelos/empresa.js
            }
        );
    }


// Obtiene todos los objetos Usuarios de la base de datos
    getUsers = function (req, res) {
        loggedIn(req, res);
        User.find({},{nombre:1,apellidos:1,email:1,favoritos:1,gustos:1},function (err, users) {
                if (err)
                    res.send(err)
                res.json(users); // devuelve todos los Users en JSON
            }
        );
    }
    loginSucces = function(req,res){
        console.log(req.user);
    }
    loginFail = function (req, res) {
        res.status(403).send("Usuario o contraseña incorrecta");
    }

    loggedIn = function(req,res,next){
        if (req.user) {
            console.log("ok");
            next();
        } else {
            console.log("no");
        }

    }

// Guarda un objeto Empresa en base de datos
    newUser = function (req, res) {

        var passmd5 = crypto.createHash('md5').update(req.body.password).digest("hex");
        var now = new Date();

        // Creo el objeto Empresa
        console.log(req.body);
        User.create(
            {
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                email: req.body.email,
                password: passmd5,
                fecha_nacimiento: req.body.fecha_nacimiento,
                created_at: now,
                updated_at: now

            },
            function (err, user) {
                if (err)
                    res.send(err);
                // Obtine y devuelve todas las routes tras crear una de ellas {tags:{$in: user.gustos}
                Empresa.find({},function (err, empresas) {
                    if (err)
                        res.send(err)
                    res.json(empresas);
                });
            });

    }

    updateUser = function(req,res){
        if (req.body.password) {
            var passmd5 = crypto.createHash('md5').update(req.body.password).digest("hex");
        }
        var now = new Date();
        User.update( {_id : req.params.user_id},req.body,
            function(err, user) {
                if (err)
                    res.send(err);
                // Obtine y devuelve todas las empresas tras crear una de ellas
                User.findOne({"_id":req.params.user_id},{__v:0, password:0},function (err, user) {
                        if (err)
                            res.send(err)
                        res.json(user); // devuelve el user seleccionado/home/urtasun/WebstormProjects/whereplace/modelos/empresa.js
                    }
                );
            });

    }

    removeUser = function(req,res){

    }


    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new LocalStrategy(
        function(username, password, done) {
            var token = randtoken.generate(16);
            console.log(token);
            var passmd5 = crypto.createHash('md5').update(password).digest("hex");
            User.findOne({ email: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Ese usuario no existe.' });
                }
                if (!user.validPassword(passmd5)) {
                    return done(null, false, { message: 'Password incorrecta.' });
                }

                return done(null, user);
            });
        }
    ));

    app.get('/user/:user_id', getUser);
    app.get('/user', getUsers);

    app.get('/loginFail', loginFail);
    app.get('/loginSucces', loginSucces);

    app.post('/user', newUser);
    app.post('/user/login',
        passport.authenticate('local', {
            successRedirect: '/empresas',
            failureRedirect: '/loginFail'
        })
    );
    app.post('/user/modify/:user_id', updateUser);
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // Carga única de la vista
    });
};


