module.exports = function (app) {

    var Empresa = require('../modelos/empresa');

    // Obtiene una Empresa de la base de datos
    getEmpresa = function (req, res) {
        Empresa.findOne({"_id": req.params.empresa_id}, {
                nombre: 1,
                direccion: 1,
                ciudad: 1,
                descripcion: 1,
                email: 1,
                telefono: 1,
                puntuaciones: 1,
                tags: 1,
                comentarios: 1,
                detalles: 1
            }, function (err, empresa) {
                if (err)
                    res.send(err)
                res.json(empresa); // devuelve todas las Empresas en JSON
            }
        );
    }
// Obtiene todos los objetos Empresa de la base de datos
    getEmpresas = function (req, res) {
        console.log(req.isAuthenticated());
        Empresa.find({}, {
                nombre: 1,
                direccion: 1,
                ciudad: 1,
                descripcion: 1,
                email: 1,
                telefono: 1,
                puntuaciones: 1,
                tags: 1,
                comentarios: 1,
                detalles: 1,
                created_at: 1,
                updated_at: 1
            }, function (err, empresa) {
                if (err)
                    res.send(err)
                res.json(empresa); // devuelve todas las Empresas en JSON
            }
        );
    }

// Guarda un objeto Empresa en base de datos
    newEmpresa = function (req, res) {
        var now = new Date();
        // Creo el objeto Empresa
        Empresa.create(
            {
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                ciudad: req.body.ciudad,
                descripcion: req.body.descripcion,
                email: req.body.email,
                password: req.body.password,
                telefono: req.body.telefono,
                tags: req.body.tags,
                detalles: req.body.detalles,
                created_at: now,
                updated_at: now
            },
            function (err, empresa) {
                if (err)
                    res.send(err);
                // Obtine y devuelve todas las routes tras crear una de ellas
                Empresa.find(function (err, empresa) {
                    if (err)
                        res.send(err)
                    res.json(empresa);
                });
            });

    }

    // Guarda un objeto Empresa en base de datos
    borrarEmpresa = function (req, res) {
        var now = new Date();
       // console.log("El nombre que le paso " + req.body.nombre)
        // Creo el objeto Empresa
        Empresa.remove({"_id": req.params.empresa_id},
            function (err, empresa) {
                if (err) {
                    res.send(err);
                }
                // Obtine y devuelve todas las routes tras crear una de ellas
                Empresa.find(function (err, empresa) {
                    if (err)
                        res.send(err)
                    res.json(empresa);
                });
            });

    }

    addComment = function (req, res) {
        Empresa.findById(req.params.empresa_id, function (err, empresa) {
            if (err)
                res.send(err)
            console.log(empresa);
            empresa.comentarios.push(req.body);
            empresa.save(function (error, data) {
                if (error) {
                    res.json(error);
                }
                else {
                    res.json(data);
                    Empresa.findById(req.params.empresa_id, function (err, empresa) {
                        if (err) {
                            res.json(err);
                        }
                        else {
                            res.json(empresa);
                        }
                    });

                }
            });

        });

    }

    addRate = function (req, res) {
        Empresa.findById(req.params.empresa_id, function (err, empresa) {
            if (err)
                res.send(err)

            empresa.puntuaciones.push(req.body);

            empresa.save(function (error, data) {
                if (error) {
                    res.json(error);
                }
                else {
                    res.json(data);
                }
            });

        });

    }


    updateEmpresa = function (req, res) {
        var now = new Date();
        console.log("ID A MODIFICIAR " +req.params.empresa_id);
        Empresa.update({_id: req.params.empresa_id}, req.body,
            function (err, user) {
                if (err)
                    res.send(err);
                // Obtine y devuelve todas las empresas tras cryptoear una de ellas
                Empresa.findOne({"_id": req.params.empresa_id}, {__v: 0, password: 0}, function (err, user) {
                        if (err)
                            res.send(err)
                        res.json(user); // devuelve el user seleccionado/home/urtasun/WebstormProjects/whereplace/modelos/empresa.js
                    }
                );
            });

    }
    getEmpresasByGustos = function (req, res) {
        Empresa.find({"tags": req.params.gusto}, {
                nombre: 1,
                direccion: 1,
                ciudad: 1,
                descripcion: 1,
                email: 1,
                telefono: 1,
                puntuacion: 1,
                tags: 1,
                comentarios: 1,
                detalles: 1,
                created_at: 1,
                updated_at: 1
            }, function (err, empresa) {
                if (err)
                    res.send(err)
                res.json(empresa); // devuelve todas las Empresas en JSON
            }
        );
    }

    empresalogin = function (req, res) {
        Empresa.findOne({"nombre": req.body.nombre}, function (err, empresa) {
                if (err)
                    res.send(err)
                if (req.body.password == empresa.password) {
                    console.log("logIN OK");
                    res.json(empresa);
                }
                else {
                    res.send("LogIN FAIL");

                    console.log("LOGIN FAIL");
                }
            }
        );
    }

    getPuntuacion = function (req, res) {

        Empresa.findOne({"_id": req.params.empresa_id}, {puntuacion: 1}, function (err, empresa) {
                if (err)
                    res.send(err)
                res.json(empresa); // devuelve todas las Empresas en JSON
            }
        );

    }
    empresasbyComments = function (req, res) {
        console.log("Hola");

        Empresa.find({"comentarios.user_id": "569297a16ca8b6782a006ca3"}, function (err, empresas) {
            if (err)
                res.send(err);
            else
                res.json(empresas);
        });
    }
    getBusqueda = function (req, res) {
        var regex = new RegExp(req.body.busqueda, "i");
        Empresa.find({"nombre": regex}, function (err, empresas) {
            if (err)
                res.send(err);
            else
                res.json(empresas);
        });
    }


    app.get('/empresa/:empresa_id', getEmpresa);
    // app.get('/', getEmpresas);
// Crear una nueva Empresa
    app.get('/empresas', getEmpresas);
    app.get('/empresas/:gusto', getEmpresasByGustos);

    app.get('/empresas/:empresa_id/puntuacion', getPuntuacion);
    app.delete('/empresas/delete/:empresa_id', borrarEmpresa);

    app.post('/empresas/busquedas', getBusqueda);
    app.put('/empresa/modify/:empresa_id', updateEmpresa);
    app.post('/empresa/:empresa_id/comment', addComment);
    app.post('/empresa/:empresa_id/rating', addRate);
    app.post('/empresa', newEmpresa);
    app.post('/empresa/login', empresalogin);


}
