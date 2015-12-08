
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//Definir el schema de user

var userSchema = new Schema({
    nombre: String,
    apellidos: String,
    password: String,
    email: String,
    gustos: [String],
    fecha_nacimiento: Date ,
    created_at: Date,
    updated_at: Date,
    contador_comentarios: String,
    favoritos: [String]
});

userSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};


var User = mongoose.model("User", userSchema);

module.exports = User

