module.exports = function(app) {

    var Empresa = require('/modelos/empresa');
    // Obtiene una Empresa de la base de datos
    getEmpresa = function (req, res) {
        Empresa.findOne({"_id":req.params._id},function (err, empresa) {
                if (err)
                    res.send(err)
                res.json(empresa); // devuelve todas las Empresas en JSON
            }
        );
    }
// Obtiene todos los objetos Empresa de la base de datos
    getEmpresas = function (req, res) {
        Empresa.find(function (err, empresa) {
                if (err)
                    res.send(err)
                res.json(empresa); // devuelve todas las Empresas en JSON
            }
        );
    }

// Guarda un objeto Empresa en base de datos
    newEmpresa = function (req, res) {

        // Creo el objeto Empresa
        Empresa.create(
            {
                nombre: req.body.nombre,
                direccion: req.body.username,
                descripcion: req.body.descripcion,
                email: req.body.email,
                password: req.body.password,
                telefono:req.body.telefono,
                puntuacion: req.body.puntuacion,
                tags: req.body.tags
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



    app.get('/empresa/:empresa_id', getEmpresa);
// Crear una nueva Empresa
    app.get('/empresa', getEmpresas);
// Modificar los datos de una Empresa
    app.post('/empresa', newEmpresa);
// Borrar una Empresa
    app.post('/empresa/login', empresaLogin);
}