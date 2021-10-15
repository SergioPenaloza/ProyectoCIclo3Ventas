const { response } = require("express");
const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');


const getUsuarios = async (req, resp = response) => {
    const usuarios = await Usuario.find().populate('rol','nombre');
    
    resp.status(200).json({
        ok: true,
        msg: 'Listar Usuarios',
        usuarios
    })
};

const setUsuario = async (req, resp = response) => {

    const usuario = new Usuario(req.body);

    try {

        const us = await usuario.save();

        resp.status(201).json({
            ok: true,
            msg: 'Usuario creado',
            usuario: us
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al crear el usuario',
        });
    }  
}


const actualizarUsuario = async (req, resp = response) => {
    const usuarioId = req.params.id;

    try {
        
        const usuario = await Usuario.findById(usuarioId);

        if(!usuario) {
            resp.status(404).json({
                ok: false,
                msg: 'El id del usuario no coincide con ningun elemento en la base de datos',
            });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioId, req.body, { new: true });

        resp.json({
            ok: true,
            msg: 'Usuario actualizado de manera exitosa',
            usuario: usuarioActualizado
        });


    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'error al actualizar el usuario',
        });
    }
}

    

const eliminarUsuario = async (req, resp = response) => {
    const usuarioId = req.params.id;

    try {
        
        const usuario = await Usuario.findById(usuarioId);

        if(!usuario) {
            resp.status(404).json({
                ok: false,
                msg: 'El id del usuario no coincide con ningun elemento en la base de datos',
            });
        }

        await Usuario.findByIdAndDelete(usuarioId);

        resp.json({
            ok: true,
            msg: 'Usuario eliminado de manera exitosa'
        });


    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'error al eliminar el usuario',
        });
    }
}

module.exports = {
    getUsuarios,
    setUsuario,
    actualizarUsuario,
    eliminarUsuario    
};