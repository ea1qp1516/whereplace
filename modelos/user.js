
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Definir el schema de user

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
