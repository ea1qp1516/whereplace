module.exports = function(app) {

    var Empresa = require('../modelos/empresa');
    // Obtiene una Empresa de la base de datos
    getEmpresa = function (req, res) {
        Empresa.findOne({"_id":req.params.empresa_id},{nombre:1,direccion:1,ciudad:1,descripcion:1,email:1,telefono:1,puntuacion:1,tags:1,comentarios:1,detalles:1},function (err, empresa) {
                if (err)
                    res.send(err)
                res.json(empresa); // devuelve todas las Empresas en JSON
            }
        );
    }
// Obtiene todos los objetos Empresa de la base de datos
    getEmpresas = function (req, res) {
        Empresa.find({},{nombre:1,direccion:1,ciudad:1,descripcion:1,email:1,telefono:1,puntuacion:1,tags:1,comentarios:1,detalles:1, created_at:1, updated_at: 1},function (err, empresa) {
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
                direccion: req.body.username,
                ciudad: req.body.ciudad,
                descripcion: req.body.descripcion,
                email: req.body.email,
                password: req.body.password,
                telefono:req.body.telefono,
                puntuacion: req.body.puntuacion,
                tags: req.body.tags,
                detalles:req.body.detalles,
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
    addComment = function(req,res){
        Empresa.update({_id:req.params.empresa_id},{$push:{ comentarios:{ comentario: req.body.comentario, created_at:req.body.created_at, user: req.body.email}}}, function(err,empresa){
            if (err)
                res.send(err)
            res.json(empresa);
        });

    }

    updateEmpresa = function(req,res){
        if (req.body.password) {
            var passmd5 = crypto.createHash('md5').update(req.body.password).digest("hex");
        }
        var now = new Date();
        Empresa.update( {_id : req.params.empresa_id},req.body,
            function(err, user) {
                if (err)
                    res.send(err);
                // Obtine y devuelve todas las empresas tras crear una de ellas
                Empresa.findOne({"_id":req.params.empresa_id},{__v:0, password:0},function (err, user) {
                        if (err)
                            res.send(err)
                        res.json(user); // devuelve el user seleccionado/home/urtasun/WebstormProjects/whereplace/modelos/empresa.js
                    }
                );
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
// Crear una nueva Empresa
    app.get('/empresas', getEmpresas);
    app.post('/empresa/modify/:empresa_id', updateEmpresa);
    app.post('/empresa/:empresa_id/comment', addComment);
    app.post('/empresa', newEmpresa);
    app.post('/empresa/login', empresalogin);
}