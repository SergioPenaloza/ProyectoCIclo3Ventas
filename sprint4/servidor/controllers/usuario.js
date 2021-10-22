const { responde } = require('express');
const Rol = require('../models/rol');
const Usuario = require('../models/usuario');

const listarUsuario = async (req, res = response) => {

    try {
        const rtaUsuario = await Usuario.find().populate('rol', 'nombre');

        if (rtaUsuario.length > 1)
            rtaUsuario.sort(function (a, b) {
                return a['nombre'].toLowerCase() > b['nombre'].toLowerCase() ? 1 :
                    a['nombre'].toLowerCase() < b['nombre'].toLowerCase() ? -1 :
                        0;
            });

        res.status(200).json({
            ok: true,
            msg: 'Lista de usuarios',
            rtaUsuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al listar los usuarios"
        })
    }
};

const crearUsuario = async (req, res = response) => {

    const { nombre, email, password, rol, estado } = req.body;

    try {
        let rtaUsuario = await Usuario.findOne({ email: { $regex: '^' + email + '$', $options: 'i' } });

        if (rtaUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con este correo'
            });
        }

        let ObjectId = require('mongoose').Types.ObjectId;

        if (!ObjectId.isValid(rol) || !await Rol.findById(rol)) {
            return res.status(404).json({
                ok: false,
                msg: 'El rol no existe'
            });
        }

        rtaUsuario = new Usuario(req.body);

        await rtaUsuario.save();

        res.status(201).json({
            ok: true,
            msg: 'Registrado el usuario',
            rtaUsuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al guardar el usuario"
        })
    }
};

const buscarUsuario = async (req, res = response) => {

    const usuarioId = req.params.id.trim();

    try {
        let rtaUsuario;
        if (usuarioId.length > 0) {
            rtaUsuario = await Usuario.find({ nombre: { $regex: '' + usuarioId + '', $options: 'i' } }).populate('rol', 'nombre');
            if (rtaUsuario.length == 0) {
                let ObjectId = require('mongoose').Types.ObjectId;
                if (!ObjectId.isValid(usuarioId) || !(rtaUsuario = await Usuario.findById(usuarioId).populate('rol', 'nombre'))) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'El usuario no existe'
                    });
                }
            }
        } else {
            return res.status(201).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        if (rtaUsuario.length > 1)
            rtaUsuario.sort(function (a, b) {
                return a['nombre'].toLowerCase() > b['nombre'].toLowerCase() ? 1 :
                    a['nombre'].toLowerCase() < b['nombre'].toLowerCase() ? -1 :
                        0;
            });

        res.status(404).json({
            ok: true,
            msg: 'Buscado el usuario',
            rtaUsuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al buscar usuarios"
        })
    }
};

const actualizarUsuario = async (req, res = response) => {
    const { nombre, email, password, rol, estado } = req.body;
    const usuarioId = req.params.id;

    try {
        let ObjectId = require('mongoose').Types.ObjectId;

        if (!ObjectId.isValid(usuarioId) || !await Usuario.findById(usuarioId)) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        usuario1 = await Usuario.findOne(
            { $and: [{ nombre: { $regex: '^' + nombre + '$', $options: 'i' } }, { _id: { $ne: usuarioId } }] });
        if (usuario1) {
            return res.status(404).json({
                ok: false,
                msg: 'Ya existe un usuario con este nombres'
            });
        }

        ObjectId = require('mongoose').Types.ObjectId;

        if (!ObjectId.isValid(rol) || !await Rol.findById(rol)) {
            return res.status(404).json({
                ok: false,
                msg: 'El rol no existe'
            });
        }

        const rtaUsuario = await Usuario.findByIdAndUpdate(usuarioId, req.body, { new: true });

        res.status(201).json({
            ok: true,
            msg: 'Actualizado el usuario',
            rtaUsuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al editar el usuario"
        })
    }
};

const eliminarUsuario = async (req, res = response) => {

    const usuarioId = req.params.id;

    try {
        let ObjectId = require('mongoose').Types.ObjectId;

        if (!ObjectId.isValid(usuarioId) || !await Usuario.findById(usuarioId)) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        await Usuario.findByIdAndDelete(usuarioId);

        res.status(200).json({
            ok: true,
            msg: 'Eliminado el usuario'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al borrar el usuario"
        })
    }
};



module.exports = {
    listarUsuario,
    crearUsuario,
    buscarUsuario,
    actualizarUsuario,
    eliminarUsuario
}