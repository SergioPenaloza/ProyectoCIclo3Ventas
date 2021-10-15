const { Router } = require('express');
const router = Router();

const { getUsuarios, setUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios');

router.get('/listar', getUsuarios);

router.post('/insertarUsuario', setUsuario);

router.put('/actualizar/:id', actualizarUsuario);

router.delete('/eliminar/:id', eliminarUsuario);

module.exports = router;
