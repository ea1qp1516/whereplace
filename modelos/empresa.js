
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
    location: { type: [Number], index: '2d'}

};




module.exports = mongoose.model("Empresa", empresaSchema);
