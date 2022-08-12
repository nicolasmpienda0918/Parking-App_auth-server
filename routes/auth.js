// Importar del paquete express la funicon Router
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loguinUsuario, validarToken, } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');


// Ejecucio de la funcion
const router = Router();

// Crear Nuevo Usuario
router.post('/new', [
    check('name', 'El Nombre debe cotener almenos 6 letras').not().isEmpty().isLength({ min: 6 }),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'la password es obligatorio').isLength({ min: 6 }),
    validarCampos

], crearUsuario);

// Login Usuario
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'la password es obligatorio').isLength({ min: 6 }),
    validarCampos

], loguinUsuario);




// Validar y revalidar Token
router.get('/renew', validarJWT, validarToken);



// Exportar  para poder utilizar en otros archivos
module.exports = router;