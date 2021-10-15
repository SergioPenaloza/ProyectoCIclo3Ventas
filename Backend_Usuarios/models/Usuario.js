const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref:'Rol',
        require:true
    },
    estado: {
        type: Boolean,
        require: true
    }
});

module.exports = model('Usuario', UsuarioSchema);