
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Definir el schema de user

var comentarioSchema = {
    comentario: String,
    created_at: Date,
    user: String,
    user_id: String
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
    puntuaciones: [puntuacionSchema]
};

var userSchema = new Schema({
    nombre: String,
    apellidos: String,
    password: String,
    email: String,
    gustos: [String],
    fecha_nacimiento: String ,
    created_at: Date,
    updated_at: Date,
    contador_comentarios: String,
    favoritos: [empresaSchema],
    token: String,
    avatar: String
});

userSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};


var User = mongoose.model("User", userSchema);

module.exports = User
