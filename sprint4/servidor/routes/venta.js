const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const {validarCampos} = require('../middlewares/validar-campos');
const { listarVenta, crearVenta, actualizarVenta, eliminarVenta, buscarVenta } = require('../controllers/venta');

router.get(
    '/',
    listarVenta);

router.post(
    '/',
    [ 
        check('cliente.id','El id del cliente es obligatorio').not().isEmpty(),
        check('cliente.nombre','El nombre del cliente es obligatorio').not().isEmpty(),
        check('vendedor','El vendedor es obligatorio').not().isEmpty(),
        check('detalle','El detalle es obligatorio').not().isEmpty(),
        check('detalle','El detalle no hay productos').isArray(),
        check('detalle[*].producto','La cantidad debe ser numerica').not().isEmpty(),
        check('detalle[*].cantidad','La cantidad debe ser numerica').isNumeric(),   
        check('detalle[*].cantidad','La cantidad debe ser positiva').matches(/^([1-9]+[0-9]*)$/),
        validarCampos
    ],
    crearVenta);

router.put(
    '/:id',
    [ 
        check('estado','El estado es obligatorio').not().isEmpty(),
        check('estado','El estado debe ser numerico').isNumeric(),
        check('estado','El estado debe ser [1,2,3]').matches(/^[1-3]$/),
        validarCampos
    ],
    actualizarVenta);

router.delete(
    '/:id',
    eliminarVenta);

router.get(
    '/:id',
    buscarVenta);
    
module.exports = router;