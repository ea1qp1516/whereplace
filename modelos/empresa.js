
var mongoose = require('mongoose');


//Definir el schema de empresa

var comentarioSchema = {
    comentario: String,
        created_at: Date,
        user: String,
        avatar: String
};

var puntuacionSchema = {
    puntuacion: Number,
    contador: Number,
    users: [String]
};

var empresaSchema = {
    nombre:String,
    direccion:String,
    ciudad: String,
    descripcion:String,
    email:String,
    password:String,
    telefono: String,
    tags:[String],
    comentarios:[comentarioSchema],
    detalles:[String],
    created_at: Date,
    updated_at: Date,
    puntuacion: puntuacionSchema
};




module.exports = mongoose.model("Comentario", comentarioSchema);
module.exports = mongoose.model("Puntuacion", puntuacionSchema);
module.exports = mongoose.model("Empresa", empresaSchema);
