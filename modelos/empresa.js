
var mongoose = require('mongoose');


//Definir el schema de empresa

var empresaSchema = {
    nombre:String,
    direccion:String,
    ciudad: String,
    descripcion:String,
    email:String,
    password:String,
    telefono: String,
    puntuacion: String,
    tags:[String],
    comentarios:[String],
    detalles:[String],
    created_at: Date,
    updated_at: Date,
};



module.exports = mongoose.model("Empresa", empresaSchema);


