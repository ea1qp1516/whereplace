var crypto = require('crypto');
var randtoken = require('rand-token');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


module.exports = function (app, passport) {

    var User = require('../modelos/user');
    var Empresa = require('../modelos/empresa');
    // Obtiene un Usuario de la base de datos
    getUser = function (req, res) {
        User.findOne({"_id": req.params.user_id}, {
                nombre: 1,
                apellidos: 1,
                email: 1,
                favoritos: 1,
                gustos: 1,
                avatar: 1
            }, function (err, user) {
                if (err)
                    res.send(err)
                res.json(user); // devuelve el user seleccionado/home/urtasun/WebstormProjects/whereplace/modelos/empresa.js
            }
        );
    }


// Obtiene todos los objetos Usuarios de la base de datos
    getUsers = function (req, res) {
        User.find({}, {nombre: 1, apellidos: 1, email: 1, favoritos: 1, gustos: 1, avatar: 1}, function (err, users) {
                if (err)
                    res.send(err)
                res.json(users); // devuelve todos los Users en JSON
            }
        );
    }

    //Obtiene el avatar del usuario que se le pasa el id

    getAvatar = function (req, res) {
        User.findOne({"_id": req.params.user_id}, {
                avatar: 1
            }, function (err, user) {
                if (err)
                    res.send(err)
                res.json(user);
            }
        );
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
                updated_at: now,
                avatar: req.body.avatar

            },
            function (err, user) {
                if (err)
                    res.send(err);
                // Obtine y devuelve todas las routes tras crear una de ellas {tags:{$in: user.gustos}
                Empresa.find({}, function (err, empresas) {
                    if (err)
                        res.send(err)
                    res.json(empresas);
                });
            });

    }

    updateUser = function (req, res) {
        if (req.body.password) {
            var passmd5 = crypto.createHash('md5').update(req.body.password).digest("hex");
        }
        var now = new Date();
        User.update({_id: req.params.user_id}, req.body,
            function (err, user) {
                if (err)
                    res.send(err);

                User.findOne({"_id": req.params.user_id}, {__v: 0, password: 0}, function (err, user) {
                        if (err)
                            res.send(err)
                        res.json(user);
                    }
                );
            });

    }

    removeUser = function (req, res) {

    }

    app.get('/user/:user_id', getUser);
    app.get('/user', getUsers);
    app.get('/user/:user_id/avatar', getAvatar);

    app.post('/user', newUser);
    app.post('/user/login',
        passport.authenticate('local'), function (req, res) {
            if (req.user) {
                res.send(req.user);
            }
            if (!req.user) {
                res.status(403).send(req.message)
            }
        }
    );
    
    app.post('/user/modify/:user_id', updateUser);
    app.put('/user/:user_id',multipartMiddleware, addImages);

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new LocalStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {
            var token = randtoken.generate(16);
            console.log(token);
            var passmd5 = crypto.createHash('md5').update(password).digest("hex");
            User.findOne({email: username}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: 'Ese usuario no existe.'});
                }
                if (!user.validPassword(passmd5)) {
                    return done(null, false, {message: 'Password incorrecta.'});
                }
                User.findByIdAndUpdate(user._id, {$set: {token: token}}, function (err, user) {
                    if (err) {
                        return done(err)
                    }
                });
                return done(null, user);
            });
        }
    ));
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        console.log(req.isAuthenticated());
        return next();
    }
    else {
        res.redirect('/loginFail');
    }
}


addImages = function (req, res, next) {


            fs.mkdir("/public/img/avatar_users/" + req.params.user_id);
            fs.mkdir("/public/img/avatar_users/" + req.params.user_id + "/avatar");
            var tmp_path = req.files.file.path;
            var ext = req.files.file.type;
            ext = ext.split('/');
            var target_path = '/public/img/avatar_users/' + req.params.user_id + '/avatar/' + req.params.user_id + '.' + ext[1];
            fs.rename(tmp_path, target_path, function (err) {
                if (err) throw err;
                fs.unlink(tmp_path, function () {
                    if (err) throw err;
                });
            });
            
            User.findById(req.params.user_id, function(err, user) {

                    user.avatar = target_path;
                    console.log(user.avatar);

                    user.save(function(err) {
                        if(err) return res.status(500).send(err.message);
                  res.status(200).jsonp(user);
                    });


          /*  User.update( {_id : req.params.user_id},{$set:{avatar : target_path}},
					         function(err, user) {
						               if (err)
							                res.send(err);
						      });*/
  });
};
