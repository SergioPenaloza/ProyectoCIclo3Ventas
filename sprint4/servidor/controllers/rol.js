const { responde } = require('express');
const Rol = require('../models/rol');
const Usuario = require('../models/usuario');

const listarRol = async (req, res = response) => {

    try {
        const rtaRol = await Rol.find();

        if (rtaRol.length > 1)
            rtaRol.sort(function (a, b) {
                return a['nombre'].toLowerCase() > b['nombre'].toLowerCase() ? 1 :
                    a['nombre'].toLowerCase() < b['nombre'].toLowerCase() ? -1 :
                        0;
            });

        res.status(200).json({
            ok: true,
            msg: 'Lista de roles',
            rtaRol
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al listar los roles"
        })
    }
};

const crearRol = async (req, res = response) => {
    const { nombre } = req.body;

    try {
        let rtaRol = await Rol.findOne({ nombre: { $regex: '^' + nombre + '$', $options: 'i' } });

        if (rtaRol) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un rol con este nombre'
            });
        }

        rtaRol = new Rol(req.body);

        await rtaRol.save();

        res.status(201).json({
            ok: true,
            msg: 'Registrado el rol',
            rtaRol
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al registar el rol"
        })
    }
};

const buscarRol = async (req, res = response) => {

    const rolId = req.params.id.trim();

    try {
        let rtaRol;
        if (rolId.length>0){
            rtaRol = await Rol.find({ nombre: { $regex: '' + rolId + '', $options: 'i' } });
            if (rtaRol.length == 0) {
                let ObjectId = require('mongoose').Types.ObjectId;
                if (!ObjectId.isValid(rolId) || !(rtaRol = await Rol.findById(rolId))) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'El rol no existe'
                    });
                }
            }
        }else{
            return res.status(404).json({
                ok: false,
                msg: 'EL rol no existe'
            });
        }

        if (rtaRol.length > 1)
            rtaRol.sort(function (a, b) {
                return a['nombre'].toLowerCase() > b['nombre'].toLowerCase() ? 1 :
                    a['nombre'].toLowerCase() < b['nombre'].toLowerCase() ? -1 :
                        0;
            });

        res.status(200).json({
            ok: true,
            msg: 'Buscado el rol',
            rtaRol
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al buscar rol"
        })
    }
};

const actualizarRol = async (req, res = response) => {
    const { nombre } = req.body;

    const rolId = req.params.id;

    try {
        let ObjectId = require('mongoose').Types.ObjectId;

        if (!ObjectId.isValid(rolId) || !await Rol.findById(rolId)) {
            return res.status(404).json({
                ok: false,
                msg: 'El rol no existe'
            });
        }

        rtaRol = await Rol.findOne(
            { $and: [{ nombre: { $regex: '^' + nombre + '$', $options: 'i' } }, { _id: { $ne: rolId } }] });
        if (rtaRol) {
            return res.status(404).json({
                ok: false,
                msg: 'Ya existe un rol con este nombre'
            });
        }

        rtaRol = await Rol.findByIdAndUpdate(rolId, req.body, { new: true });

        res.json({
            ok: true,
            msg: 'Actualizada la catgoria',
            rtaRol
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al editar rol"
        })
    }
};

const eliminarRol = async (req, res = response) => {

    const rolId = req.params.id;

    try {
        let ObjectId = require('mongoose').Types.ObjectId;

        if (!ObjectId.isValid(rolId) || !await Rol.findById(rolId)) {
            return res.status(404).json({
                ok: false,
                msg: 'El rol no existe'
            });
        }

        rtaRol = await Usuario.find({ rol: rolId });
        if (rtaRol.length > 0) {
            return res.status(404).json({
                ok: false,
                msg: 'El rol no se puede eliminar esta asociada con un usuario'
            });
        }

        await Rol.findByIdAndDelete(rolId);

        res.status(200).json({
            ok: true,
            msg: 'Eliminado el rol'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al borrar el rol"
        })
    }
};

// const crearRol = (req,res = response)=>{
//         res.status(201).json({
//             ok: true,
//             msg: 'registrado'
//         });
// };

module.exports = {
    listarRol,
    crearRol,
    buscarRol,
    actualizarRol,
    eliminarRol
}