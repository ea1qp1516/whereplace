/**
 * Created by urtasun on 8/12/15.
 */

var mongoose = require('mongoose');

var comentarioSchema = {
    comentario: String,
    created_at: Date,
    user: String
};


module.exports = mongoose.model("Comentario", comentarioSchema);

