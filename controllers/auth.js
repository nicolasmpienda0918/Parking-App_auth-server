// para validar el tipado
const { response } = require('express');
const Usuario = require('../Models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');





// CONTROLADOR  CREAR NUEVO USUARIO 
const crearUsuario = async(req, res = response) => {


    const { name, email, password } = req.body;

    try {

        //Verificar el email

        const usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'el email ya esta registrado'
            });
        }

        //Crear usuario cn el medelo        
        const dbUser = new Usuario(req.body);



        //Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);


        //Generar el JWT
        const token = await generarJWT(dbUser.id, name);



        //Crear usuario de BD
        await dbUser.save();



        //Generar  respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token

        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Algo salio mal, por favor validar con el Administrador'
        });
    }

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// CONTROLADOR DEL LOGIN DE USUARIO
const loguinUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const dbUser = await Usuario.findOne({ email });

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }


        // Confrimar si la contraseña es correcta

        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es correcta'
            });
        }

        //Generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        //Respuesta del Servicio  
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token,
            msg: 'Conexion exitosa'

        });


    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'

        });
    }

};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// VALIDAR Y REVALIDAR TOKEN 


const validarToken = async(req, res = response) => {

    const { uid, name } = req;

    //Generar el JWT
    const token = await generarJWT(uid, name);




    return res.json({
        ok: true,
        uid,
        name,
        token


    });

};



module.exports = {
    crearUsuario,
    loguinUsuario,
    validarToken

};