
var mongoose = require('mongoose');


//Definir el schema de empresa

var empresaSchema = {
    nombre:String,
    direccion:String,
    descripcion:String,
    email:String,
    password:String,
    telefono: String,
    puntuacion: String,
    tags:[String]
};


module.exports = mongoose.model("Empresa", empresaSchema);

