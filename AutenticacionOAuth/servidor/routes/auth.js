const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearUsuario, loginUsuario, revalidarToken, googleLogin } = require('../controllers/auth');
const { validarGoogle } = require('../middlewares/validar-google');
const router = Router();

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres minimo').isLength({min: 6}),
        validarCampos
    ],

    crearUsuario);

router.post(
    '/', 

    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres minimo').isLength({min: 6}),
        validarCampos
    ],
    
    loginUsuario);

    router.get('/renew', validarJWT, revalidarToken);

//** Router Auth Google */
router.post('/google/login', validarGoogle, googleLogin);
    
module.exports = router;