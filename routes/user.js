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
                socialID: 1,
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
        User.find({}, {nombre: 1, apellidos: 1, email: 1, favoritos: 1, gustos: 1, socialID : 1, avatar: 1}, function (err, users) {
                if (err)
                    res.send(err)
                res.json(users); // devuelve todos los Users en JSON
            }
        );
    }

    //Obtiene el avatar del usuario que se le pasa el id



//SOCIAL MEDIA USER?
    findFacebook = function (req, res) {
        User.findOne({"socialID": "1"}, {
                nombre: 1,
                apellidos: 1,
                email: 1,
                socialID: 1,
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

    findTwitter = function (req, res) {
        User.findOne({"socialID": "2"}, {
                nombre: 1,
                apellidos: 1,
                email: 1,
                socialID: 1,
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
                res.json(user);
            });

    }

    findUser = function (req,res){
        console.log("here");

        User.find({email:req.body.email}, {nombre: 1, apellidos: 1, email: 1, favoritos: 1, gustos: 1, avatar: 1}, function (err, user) {
                if (err)
                    res.send(err)
                res.send(user); // devuelve todos los Users en JSON
            }
        );

    }

    updateUser = function (req, res) {
        if (req.body.password) {
            console.log(req.body.last);
            console.log(req.body.password);
            User.findOne({"_id": req.params.user_id}, {password: 1}, function (err, user) {
                    if (err) {
                        console.log("errorhere");
                        res.send(err);

                    }
                    else {
                        var newpassmd5 = crypto.createHash('md5').update(req.body.password).digest("hex");
                        var lastpass = crypto.createHash('md5').update(req.body.last).digest("hex");
                        req.body.password = newpassmd5;
                        if (user.password == lastpass) {
                            console.log("antigua: " + lastpass);
                            console.log("nueva: " + newpassmd5);
                            User.update({_id: req.params.user_id}, req.body,
                                function (err, user) {
                                    if (err) {
                                        res.send(err);
                                    }

                                    User.findOne({"_id": req.params.user_id}, {
                                            __v: 0,
                                            password: 0
                                        }, function (err, user) {
                                            if (err) {
                                                res.send(err)
                                            }
                                            res.json(user);
                                        }
                                    );
                                });
                        }
                        else{
                            console.log("401");
                            res.sendStatus(401);
                        }
                    }
                }
            );
        }
        else {
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
    }

    addFavorito = function (req, res) {
        if(req.body.function=='add') {
            console.log("adding");
            console.log(req.body);

            User.findById(req.body.user_id, function (err, user) {
                if (err)
                    res.send(err)

                user.favoritos.push(req.body.empresa);
                user.save(function (error, data) {
                        if (error) {
                            res.json(error);
                        }
                        else {
                            User.findById(req.body.user_id, function (err, user) {
                                if (err) {
                                    res.json(err);
                                }
                                else {
                                    res.json(user);
                                }
                            });

                        }
                    }
                );

            });
        }
        if(req.body.function=='drop'){
            console.log("droping");
            console.log(req.body.empresa._id);
            console.log(req.body.user_id);
            User.findById(req.body.user_id, function (err, user) {
                if (err)
                    res.send(err)

                User.update(
                    {_id: req.body.user_id},
                    {$pull: {favoritos: {_id: req.body.empresa._id}}}, function(err, data){
                        if (err) {
                            res.json(err);
                        }
                        else {
                            User.findById(req.body.user_id, function (err, user) {
                                if (err) {
                                    res.json(err);
                                }
                                else {
                                    res.json(user);
                                }
                            });                        }
                    }
                );

            });
        }

    }

    borrarUser = function (req, res) {
        var now = new Date();
        // console.log("El nombre que le paso " + req.body.nombre)
        // Creo el objeto Empresa
        User.remove({"_id": req.params.user_id},
            function (err, empresa) {
                if (err) {
                    res.send(err);
                }
                // Obtine y devuelve todas las routes tras crear una de ellas
                User.find(function (err, empresa) {
                    if (err)
                        res.send(err)
                    res.json(empresa);
                });
            });
    }



    addImages = function (req, res, next) {


                fs.mkdir("/home/ea0/whereplace/public/img/avatar_users/" + req.params.user_id);
                fs.mkdir("/home/ea0/whereplace/public/img/avatar_users/" + req.params.user_id + "/avatar");
                var tmp_path = req.files.file.path;
                console.log(tmp_path);
                console.log(tmp_path);
                var ext = req.files.file.type;
                ext = ext.split('/');
                var target_path = '/home/ea0/whereplace/public/img/avatar_users/' + req.params.user_id + '/avatar/' + req.params.user_id;
                console.log(target_path);
                fs.rename(tmp_path, target_path, function (err) {
                    if (err) throw err;
                    fs.unlink(tmp_path, function () {
                        if (err) throw err;
                    });
                });
                avatarUser = target_path.split('/');

                var avatar_final ='/'+ avatarUser[5] + '/' + avatarUser[6] +'/'+avatarUser[7]+'/'+avatarUser[8]+'/'+avatarUser[9];
                console.log(avatar_final);
                req.body.avatar=avatar_final;
                console.log(req.body);

                //var now = new Date();

                User.update({_id: req.params.user_id},req.body,
                    function (err, user) {
                        if (err) {
                            res.send(err);
                        }else {


                            User.findOne({"_id": req.params.user_id}, {__v: 0, password: 0}, function (err, user) {
                                    if (err)
                                        res.send(err)
                                    res.json(user);
                                }
                            );
                        }
                    });


    };




    app.get('/user/:user_id', getUser);
    app.get('/user', getUsers);
    app.delete('/user/delete/:user_id', borrarUser);
    app.get('/userfb', findFacebook);
    app.get('/usertwitter', findTwitter);
    app.post('/user/find', findUser);
    app.post('/user/favorito',addFavorito);
    app.post('/user', newUser);
    app.post('/user/login',
        passport.authenticate('local'), function (req, res) {
            console.log("************************** user/login");
            if (req.user) {

                res.send(req.user);
            }
            if (!req.user) {
                res.status(403).send(req.message)
            }
        }
    );

    app.post('/user/modify/:user_id', updateUser);
    app.post('/user/modify_avatar/:user_id',multipartMiddleware, addImages);

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
            if (username=="admin@admin.com"&&password=="admin") {
                var user = {
                    usernameadmin: "admin",
                    password: "admin"
                }
                console.log("admin");
                return done(null,user);

            }else{
                var passmd5 = crypto.createHash('md5').update(password).digest("hex");
                User.findOne({email: username}, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {message: 'Ese usuario no existe.'});
                    }
                    console.log(user.password);
                    console.log(passmd5);
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
        }
    ));
};
