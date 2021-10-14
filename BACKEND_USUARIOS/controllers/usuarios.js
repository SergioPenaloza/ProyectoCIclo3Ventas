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
    const usuario = new Usuario(req.body);

    try {

        const us = await usuario.save();

        resp.status(201).json({
            ok: true,
            msg: 'Usuario actualizado',
            usuario: us
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error al actualizar el usuario',
        });
    }  
}
    

const eliminarUsuario = (req, resp = response) => {
  resp.status(200).json({
        ok: true,
        msg: 'Eliminar usuario',
    });
}

module.exports = {
    getUsuarios,
    setUsuario,
    actualizarUsuario,
    eliminarUsuario    
};