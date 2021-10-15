const express = require('express');
require('dotenv').config();
const { dbConnection} = require('./db/config');


const app = express();

/**Base de datos */

dbConnection();

app.use(express.static('public'));

app.use(express.json());

/**Rutas */
app.use('/api/usuarios', require('./routes/usuarios'));

/**Levantar servidor */

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo por el puerto ${process.env.PORT}`)
});