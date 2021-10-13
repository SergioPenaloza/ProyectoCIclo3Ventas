// console.log("Hola Mundo! Adios");
// llamar paquete de express
const express = require('express');
require('dotenv').config();

const { dbConnection } = require('./database/config');

// crear Servidor Express 
const app = express();

// Escuchar el puerto */
app.listen(process.env.Port, ()=>{
    console.log(`Servidor corriendo en el puerto ${ process.env.Port }`)
});

// Directorio public 
app.use(express.static('public'));
app.use(express.json());


/** Conectar a DB */
dbConnection();

// rutas 
app.use('/api/categoria', require('./routes/categoria'));
app.use('/api/producto', require('./routes/producto'));


