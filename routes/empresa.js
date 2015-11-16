module.exports = function(app) {

    var Empresa = require('././empresa');

// Obtiene todos los objetos Empresa de la base de datos
    exports.getEmpresa = function (req, res) {
        Empresa.find(
            function (err, empresa) {
                if (err)
                    res.send(err)
                res.json(empresa); // devuelve todas las Empresas en JSON
            }
        );
    }

// Guarda un objeto Empresa en base de datos
    exports.setEmpresa = function (req, res) {

        // Creo el objeto Empresa
        Empresa.create(
            {
                nombre: req.body.nombre,
                username: req.body.username,
                descripcion: req.body.descripcion,
                email: req.body.email,
                password: req.body.password
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

// Modificamos un objeto Empresa de la base de datos
    exports.updateEmpresa = function (req, res) {
        Empresa.update({_id: req.params.empresa_id},
            {
                $set: {
                    nombre: req.body.nombre,
                    username: req.body.username,
                    descripcion: req.body.descripcion,
                    email: req.body.email,
                    password: req.body.password
                }
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

// Elimino un objeto Empresa de la base de Datos
    exports.removeEmpresa = function (req, res) {
        Empresa.remove({_id: req.params.empresa_id}, function (err, empresa) {
            if (err)
                res.send(err);
            // Obtine y devuelve todas las routes tras borrar una de ellas
            Empresa.find(function (err, empresa) {
                if (err)
                    res.send(err)
                res.json(empresa);
            });
        });
    }


    app.get('/empresa/:empresa_id', Controller.getEmpresa);
// Crear una nueva Empresa
    app.get('/empresa', Controller.getEmpresas);
// Modificar los datos de una Empresa
    app.post('/empresa', Controller.newEmpresa);
// Borrar una Empresa
    app.post('/empresa/login', Controller.empresaLogin);
}