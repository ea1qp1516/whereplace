
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//Definir el schema de user

var userSchema = new Schema({
    username: String,
    nombre: String,
    apellidos: String,
    password: String,
    email: String,
    genero: String,
    gustos: [String],
    edad: { type: Number, min: 14, max: 80 },
    created_at: Date,
    updated_at: Date
});


var User = mongoose.model("User", userSchema);

module.exports = User

