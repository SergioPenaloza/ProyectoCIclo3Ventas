const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'rol',
        required: true
    },
    estado: {
        type: Number,
        //** 1. pendiente, 2. autorizado, 3. no autorizado */
        enum: [1, 2, 3],
        required: true
    }
},
    {
        collection: 'usuarios'
    });

module.exports = model('usuario', usuarioSchema);