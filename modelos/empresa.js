
var mongoose = require('mongoose');


//Definir el schema de empresa

var comentarioSchema = {
    comentario: String,
    created_at: Date,
    user: String,
    user_id: String
};


var empresaSchema = {
    nombre:String,
    direccion:String,
    ciudad: String,
    descripcion:String,
    email:String,
    password:String,
    telefono: String,
    puntuacion: String,
    tipo : String, //Campo de prueba borrar
    tags:[String],
    comentarios:[comentarioSchema],
    detalles:[String],
    created_at: Date,
    updated_at: Date,
};

module.exports = mongoose.model("Comentario", comentarioSchema);

module.exports = mongoose.model("Empresa", empresaSchema);


