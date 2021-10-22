const { responde } = require('express');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const listarProducto = async (req, res = response) => {

    try {
        const rtaProducto = await Producto.find().populate('categoria', 'nombre');

        if (rtaProducto.length > 1)
            rtaProducto.sort(function (a, b) {
                return a['descripcion'].toLowerCase() > b['descripcion'].toLowerCase() ? 1 :
                    a['descripcion'].toLowerCase() < b['descripcion'].toLowerCase() ? -1 :
                        0;
            });

        res.status(200).json({
            ok: true,
            msg: 'Lista de productos',
            rtaProducto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al listar los productos"
        })
    }
};

const crearProducto = async (req, res = response) => {

    const { descripcion, precio, estado, categoria } = req.body;

    try {
        let rtaProducto = await Producto.findOne({ descripcion: { $regex: '^' + descripcion + '$', $options: 'i' } });

        if (rtaProducto) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un producto con este nombre'
            });
        }

        let ObjectId = require('mongoose').Types.ObjectId;

        if (!ObjectId.isValid(categoria) || !await Categoria.findById(categoria)) {
            return res.status(404).json({
                ok: false,
                msg: 'La categoria no existe'
            });
        }

        rtaProducto = new Producto(req.body);

        await rtaProducto.save();

        res.status(201).json({
            ok: true,
            msg: 'Registrado el producto',
            rtaProducto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al guardar el producto"
        })
    }
};

const buscarProducto = async (req, res = response) => {

    const productoId = req.params.id.trim();

    try {
        let rtaProducto;
        if (productoId.length > 0) {
            rtaProducto = await Producto.find({ descripcion: { $regex: '' + productoId + '', $options: 'i' } }).populate('categoria', 'nombre');
            if (rtaProducto.length == 0) {
                let ObjectId = require('mongoose').Types.ObjectId;
                if (!ObjectId.isValid(productoId) || !(rtaProducto = await Producto.findById(productoId).populate('categoria', 'nombre'))) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'El producto no existe'
                    });
                }
            }
        } else {
            return res.status(201).json({
                ok: false,
                msg: 'El producto no existe'
            });
        }
        if (rtaProducto.length > 1)
            rtaProducto.sort(function (a, b) {
                return a['descripcion'].toLowerCase() > b['descripcion'].toLowerCase() ? 1 :
                    a['descripcion'].toLowerCase() < b['descripcion'].toLowerCase() ? -1 :
                        0;
            });

        res.status(404).json({
            ok: true,
            msg: 'Buscado el producto',
            rtaProducto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al buscar productos"
        })
    }
};

const actualizarProducto = async (req, res = response) => {
    const { descripcion, precio, estado, categoria } = req.body
    const productoId = req.params.id;

    try {
        let ObjectId = require('mongoose').Types.ObjectId;

        if (!ObjectId.isValid(productoId) || !await Producto.findById(productoId)) {
            return res.status(404).json({
                ok: false,
                msg: 'El producto no existe'
            });
        }

        producto1 = await Producto.findOne(
            { $and: [{ descripcion: { $regex: '^' + descripcion + '$', $options: 'i' } }, { _id: { $ne: productoId } }] });
        if (producto1) {
            return res.status(404).json({
                ok: false,
                msg: 'Ya existe un producto con este nombres'
            });
        }

        ObjectId = require('mongoose').Types.ObjectId;

        if (!ObjectId.isValid(categoria) || !await Categoria.findById(categoria)) {
            return res.status(404).json({
                ok: false,
                msg: 'La categoria no existe'
            });
        }

        const rtaProducto = await Producto.findByIdAndUpdate(productoId, req.body, { new: true });

        res.status(201).json({
            ok: true,
            msg: 'Actualizado el producto',
            rtaProducto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al editar el producto"
        })
    }
};

const eliminarProducto = async (req, res = response) => {

    const productoId = req.params.id;

    try {
        let ObjectId = require('mongoose').Types.ObjectId;

        if (!ObjectId.isValid(productoId) || !await Producto.findById(productoId)) {
            return res.status(404).json({
                ok: false,
                msg: 'El producto no existe'
            });
        }

        await Producto.findByIdAndDelete(productoId);

        res.status(200).json({
            ok: true,
            msg: 'Eliminado el producto'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al borrar el producto"
        })
    }
};



module.exports = {
    listarProducto,
    crearProducto,
    buscarProducto,
    actualizarProducto,
    eliminarProducto
}