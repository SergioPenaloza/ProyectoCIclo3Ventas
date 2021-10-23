const { Schema, model } = require('mongoose');

const RolSchema = Schema({
    name: {
        type: String,
        required: true
    }
}, 
{
    //**Nombre de la tabla en la base de datos definida de forma manual */
    collection: 'roles'
});

module.exports = model('Rol', RolSchema);