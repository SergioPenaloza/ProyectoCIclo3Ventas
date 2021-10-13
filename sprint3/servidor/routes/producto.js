const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const {validarCampos} = require('../middlewares/validar-campos');
const { listarProducto, crearProducto, actualizarProducto, eliminarProducto, buscarProducto } = require('../controllers/producto');

router.get(
    '/',
    listarProducto);

router.post(
    '/',
    [ 
        check('descripcion','La descripcion es obligatorio').not().isEmpty(),
        check('precio','El precio es obligatorio').not().isEmpty(),
        check('precio','El precio debe ser numerico').isNumeric(),
        // check('precio','El precio debe ser minimo cero').matches(/^[+]?([0-9]*[.])?[0-9]+$/),
        // check('precio','El precio debe ser positivo').matches(/^(0*[1-9][0-9](\.[0-9]+)?|0+\.[0-9][1-9][0-9]*)$/),
        check('categoria','La categoria es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearProducto);

router.put(
    '/:id',
    [ 
        check('descripcion','La descripcion es obligatorio').not().isEmpty(),
        check('precio','El precio es obligatorio').not().isEmpty(),
        check('precio','El precio debe ser numerico').isNumeric(),
        check('estado','El estado es obligatorio').not().isEmpty(),
        check('categoria','La categoria es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarProducto);

router.delete(
    '/:id',
    eliminarProducto);

router.get(
    '/:id',
    buscarProducto);
    
module.exports = router;