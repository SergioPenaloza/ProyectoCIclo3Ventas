const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    listarCategoria,
    crearCategoria,
    buscarCategoria,
    actualizarCategoria,
    eliminarCategoria } = require('../controllers/categoria');

router.get(
    '/',
    listarCategoria);

router.post(
    '/',
    [ 
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCategoria);

router.get(
    '/:id',
    buscarCategoria);

router.put(
    '/:id',
    [ 
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarCategoria);

router.delete(
    '/:id',
    eliminarCategoria);

module.exports = router;



