
var mongoose = require('mongoose');


//Definir el schema de user

var userSchema = {
    username: String,
    nombre: String,
    apellidos: String,
    password: String,
    email: String,
    genero: String,
    gustos: [String],
    edad: { type: Number, min: 14, max: 80 }
};


module.exports = mongoose.model("User", userSchema);

