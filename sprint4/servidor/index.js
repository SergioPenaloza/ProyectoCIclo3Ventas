// console.log("Hola Mundo! Adios");
// llamar paquete de express
const express = require('express');
require('dotenv').config();

const { dbConnection } = require('./database/config');

// crear Servidor Express 
const app = express();

// Permitir acceso a GET,POST,PUT,DELETE
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

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
app.use('/api/rol', require('./routes/rol'));
app.use('/api/usuario', require('./routes/usuario'));
app.use('/api/venta', require('./routes/venta'));


