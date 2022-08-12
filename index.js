const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');

//const { dbConnection } = require('./db/config');
require('dotenv').config();


// Crear el servidor/aplicacion de express
const app = express();

//  Bae de Datos
dbConnection();


//Directorio Publico
app.use(express.static('public'));

// CORS
app.use(cors());

//Lectura y parceo del body
app.use(express.json());


//Rutas
app.use('/api/auth', require('./routes/auth'));

//Levantar la aplicacion express
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en el puerto ${ process.env.PORT }`);
});