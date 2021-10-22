const { Schema, model } = require('mongoose');

const rolSchema = Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    }
},
    {
        collection: 'roles'
    });

module.exports = model('rol', rolSchema);