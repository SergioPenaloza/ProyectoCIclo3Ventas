console.log("Aloha mundo");

/** Llamamos al paquete de express */
const express = require('express');
require('dotenv').config();

const { dbConnection } = require('./db/config')
const cors = require('cors');

// console.log(process.env);

/** Crear servidor de express */
const app = express();

/** Levantar conexión a la DB */
dbConnection();

/**Utilizar CORS */
app.use(cors());


/** Directorio publico */
/** El use es un middleware: funcion que se ejecuta siempre que alguien hace una petición a mi servidor */
app.use(express.static('public'));

// Lectura y parseo del body de las peticiones
app.use(express.json());

/** Rutas */
/** El primer parametro es el prefijo de la ruta, es decir la base '/api/auth' o '/api/productos' */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/productos', require('./routes/productos'));

/** path => dominio.com/api/auth/login */
// app.get('/', (req, res) => {
//     res.json({
//         ok: true
//     });
// });

/** Escuchar las peticiones */
/** Se define el puerto por el cual va a ejecutar "process.env.Port" 
 * y se define un call back informativo del Servidor corriendo en el puerto XXXX */
app.listen(process.env.Port, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.Port}`);
});