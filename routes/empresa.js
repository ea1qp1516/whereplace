module.exports = function(app) {

    var Empresa = require('../modelos/empresa');
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
    empresalogin = function(req,res)
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



    app.get('/empresa/:empresa_id', getEmpresa);
    app.get('/', getEmpresas);
    app.post('/empresa', newEmpresa);
    app.post('/empresa/login', empresalogin);
}