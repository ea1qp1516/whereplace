
var mongoose = require('mongoose');


//Definir el schema de empresa

var comentarioSchema = {
        comentario: String,
        created_at: Date,
        user: String,
        avatar: String
};

var detallesSchema = {
        wifi: String,
        terraza: String,
        reservas: String,
        horario: String,
        tarjeta: String
};

var puntuacionSchema = {
    puntuacion: Number,
    userID: String

};

var coordenadasSchema = {
  lat: String,
  lng: String
}

var empresaSchema = {
    nombre:String,
    direccion:String,
    ciudad: String,
    descripcion:String,
    email:String,
    password:String,
    telefono: String,
    tag: String,
    subtags:[String],
    comentarios:[comentarioSchema],
    detalles:detallesSchema,
    created_at: Date,
    updated_at: Date,
    puntuaciones: [puntuacionSchema],
    coordenadas: coordenadasSchema
};




module.exports = mongoose.model("Comentario", comentarioSchema);
module.exports = mongoose.model("Puntuacion", puntuacionSchema);
module.exports = mongoose.model("Detalles", detallesSchema);
module.exports = mongoose.model("Empresa", empresaSchema);
