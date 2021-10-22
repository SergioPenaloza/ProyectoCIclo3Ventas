const { Schema, model } = require('mongoose');

const categoriaSchema = Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    }
},
    {
        collection: 'categorias'
    });

module.exports = model('categoria', categoriaSchema);
