const { Schema, model } = require('mongoose');

const productoSchema = Schema({
    descripcion: {
        type: String,
        required: true,
        unique: true
    },
    precio: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    },    
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categoria',
        required: true
    }
},
{
    collection: 'productos'
});

module.exports = model('producto',productoSchema);