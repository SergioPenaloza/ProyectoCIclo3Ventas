const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    listarRol,
    crearRol,
    buscarRol,
    actualizarRol,
    eliminarRol } = require('../controllers/rol');

router.get(
    '/',
    listarRol);

router.post(
    '/',
    [ 
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearRol);

router.get(
    '/:id',
    buscarRol);

router.put(
    '/:id',
    [ 
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarRol);

router.delete(
    '/:id',
    eliminarRol);

module.exports = router;