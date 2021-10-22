const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const {validarCampos} = require('../middlewares/validar-campos');
const { listarUsuario, crearUsuario, actualizarUsuario, eliminarUsuario, buscarUsuario } = require('../controllers/usuario');

router.get(
    '/',
    listarUsuario);

router.post(
    '/',
    [ 
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','El correo es obligatorio').not().isEmpty(),
        check('email','El correo es obligatorio').isEmail(),
        check('password','La contraseña es obligatorio').not().isEmpty(),
        check('rol','El rol es obligatorio').not().isEmpty(),
        check('estado','El estado es obligatorio').not().isEmpty(),
        check('estado','El estado es obligatorio').isNumeric(),
        validarCampos
    ],
    crearUsuario);

router.put(
    '/:id',
    [ 
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','El correo es obligatorio').not().isEmpty(),
        check('email','El correo es obligatorio').isEmail(),
        check('password','La contraseña es obligatorio').not().isEmpty(),
        check('rol','El rol es obligatorio').not().isEmpty(),
        check('estado','El estado es obligatorio').not().isEmpty(),
        check('estado','El estado es obligatorio').isNumeric(),
        validarCampos
    ],
    actualizarUsuario);

router.delete(
    '/:id',
    eliminarUsuario);

router.get(
    '/:id',
    buscarUsuario);
    
module.exports = router;