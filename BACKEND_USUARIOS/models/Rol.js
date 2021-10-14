const { Schema, model } = require('mongoose');

const RolSchema = Schema ({
    nombre: {
        type: String,
        require: true
    }
},
{
    Collection: 'roles'
});

module.exports = model('Rol', RolSchema);