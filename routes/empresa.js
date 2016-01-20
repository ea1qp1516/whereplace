module.exports = function (app) {

    var Empresa = require('../modelos/empresa');

    // Obtiene una Empresa de la base de datos
    getEmpresa = function (req, res) {
        Empresa.findOne({"_id": req.params.empresa_id}, { _id:0, password:0  }, function (err, empresa) {
                if (err)
                    res.send(err)
                res.json(empresa); // devuelve todas las Empresas en JSON
            }
        );
    }
// Obtiene todos los objetos Empresa de la base de datos
    getEmpresas = function (req, res) {
        var count = req.query.count || 5;
        var page = req.query.page || 1;

        var pagination = {
            start: (page - 1) * count,
            count: count
        };

        var sort = {
            sort: {
                desc: '_id'
            }
        };
        Empresa
            .find({},{password:0})
            .page(pagination, function (err, empresa) {
                if (err)
                    res.send(err)
                res.json(empresa); // devuelve todas las Empresas en JSON
            }
        );
    }

// Guarda un objeto Empresa en base de datos
    newEmpresa = function (req, res) {
        var now = new Date();
        Empresa.create(
            {
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                ciudad: req.body.ciudad,
                descripcion: req.body.descripcion,
                email: req.body.email,
                password: req.body.password,
                telefono: req.body.telefono,
                tag: req.body.tag,
                subtags: req.body.subtags,
                detalles: req.body.detalles,
                location: req.body.location,
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

        var count = req.query.count || 5;
        var page = req.query.page || 1;

        var pagination = {
            start: (page - 1) * count,
            count: count
        };
        var sort = {
            sort: {
                desc: '_id'
            }
        };

        if (req.query.latitude!=undefined||req.query.longitude!=undefined) {
            console.log("dins");

            var maxDistance = req.query.distance || 8;

            maxDistance /= 6371;

            var coords = [];
            coords[1] = req.query.latitude;
            coords[0] = req.query.longitude;

            console.log("coord: " + coords);
            console.log("maxD: " + maxDistance);
            Empresa.find({$and: [{"location": {$geoWithin: {$centerSphere: [[coords[0], coords[1]], maxDistance]}}}, {"tag": {$in: req.body.gusto}}]},
                {password: 0})
                .page(pagination, function (err, empresa) {
                    console.log("results");
                    if (err) {
                        console.log("err");
                        res.send(err);
                    } else {
                        res.json(empresa); // devuelve todas las Empresas en JSON
                    }
                }
            );
        }
        else {
            console.log(req.body.gusto);
            Empresa.find({tag: {$in: req.body.gusto}},
                {password: 0})
                .page(pagination, function (err, empresa) {
                    console.log("results");
                    if (err) {
                        console.log("err");
                        res.send(err);
                    } else {
                        res.json(empresa); // devuelve todas las Empresas en JSON
                    }
                })

        }
    }

    empresalogin = function (req, res) {
        Empresa.findOne({"email": req.body.email}, function (err, empresa) {
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
        var count = req.query.count || 5;
        var page = req.query.page || 1;

        var pagination = {
            start: (page - 1) * count,
            count: count
        };

        var sort = {
            sort: {
                desc: '_id'
            }
        };
        Empresa.find({"comentarios.user_id": req.params.user_id})
            .page(pagination, function (err, empresas) {
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
    app.get('/empresas/comentarios/:user_id', empresasbyComments);
    app.get('/empresas/:empresa_id/puntuacion', getPuntuacion);
    app.delete('/empresas/delete/:empresa_id', borrarEmpresa);

    app.post('/empresas', getEmpresasByGustos);
    app.post('/empresas/busquedas', getBusqueda);
    app.put('/empresa/modify/:empresa_id', updateEmpresa);
    app.post('/empresa/:empresa_id/comment', addComment);
    app.post('/empresa/:empresa_id/rating', addRate);
    app.post('/empresa', newEmpresa);
    app.post('/empresa/login', empresalogin);


}
