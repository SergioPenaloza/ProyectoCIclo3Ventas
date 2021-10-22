const { Schema, model } = require('mongoose');

const ventaSchema = Schema({
    fecha: {
        type: Date,
        default: new Date(),
        required: true
    },
    estado: {
        type: Number,
        //** 1. En proceso, 2. Cancelada, 3. Entregada */
        enum: [1, 2, 3],
        default: 1,
        required: true
    },
    cliente: {
        id: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        }
    },
    vendedor: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    detalle: [ {
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'producto',
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        } }
    ],
    total: {
        type: Number,
        required: true
    }
},
    {
        collection: 'ventas'
    });

module.exports = model('venta', ventaSchema);