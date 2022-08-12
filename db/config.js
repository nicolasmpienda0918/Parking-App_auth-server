//Conexion a base de datos

const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.bd_conx);

        console.log('BD Online');

    } catch (error) {

        console.log(error);
        throw new Error('Error a la hora de inicializar la DB');

    }

};

module.exports = {
    dbConnection
};