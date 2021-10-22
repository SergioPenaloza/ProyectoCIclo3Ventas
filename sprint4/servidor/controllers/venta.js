const { responde } = require('express');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const Venta = require('../models/venta');

const listarVenta = async (req, res = response) => {

    try {
        const rtaVenta = await Venta.find().populate('detalle.producto', ['descripcion', 'precio']).populate('vendedor', 'nombre');

        if (rtaVenta.length > 1)
            rtaVenta.sort(function (a, b) {
                return a['fecha'] > b['fecha'] ? 1 :
                    a['fecha'] < b['fecha'] ? -1 :
                        0;
            });

        res.status(200).json({
            ok: true,
            msg: 'Lista de ventas',
            rtaVenta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al listar las ventas"
        })
    }
};

const crearVenta = async (req, res = response) => {
    let { cliente, vendedor, detalle, total } = req.body;

    try {

        let ObjectId = require('mongoose').Types.ObjectId;

        if (!ObjectId.isValid(vendedor) || !await Usuario.findById(vendedor)) {
            return res.status(404).json({
                ok: false,
                msg: 'El vendedor no existe'
            });
        }

        for (let i = 0; i < detalle.length; i++) {
            if (!ObjectId.isValid(detalle[i].producto) || !await Producto.findById(detalle[i].producto)) {
                return res.status(404).json({
                    ok: false,
                    msg: 'El producto <' + detalle[i].producto + '> no existe'
                });
            }
        }
        let v = [];
        detalle.map((item) => v.push(item.producto));
        let producto = await Producto.find({ _id: { $in: v } });

        let calculo = 0;
        for (let i = 0; i < detalle.length; i++) {
            for (let j = 0; j < producto.length; j++) {
                if (detalle[i].producto == producto[j]._id) {
                    calculo = calculo + detalle[i].cantidad * producto[j].precio;
                    break;
                }
            }
        }
        total = calculo;
        rtaVenta = new Venta({ cliente, vendedor, detalle, total });
        // console.log(rtaVenta);
        await rtaVenta.save();

        res.status(201).json({
            ok: true,
            msg: 'Registrada la venta',
            rtaVenta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al guardar la venta"
        })
    }
};

const buscarVenta = async (req, res = response) => {
    const ventaId = req.params.id.trim();

    try {
        let rtaVenta;
        if (ventaId.length > 0) {
            rtaVenta = await Venta.find(
                {
                    $or: [
                        { 'cliente.id': { $regex: '' + ventaId + '', $options: 'i' } },
                        { 'cliente.nombre': { $regex: '' + ventaId + '', $options: 'i' } },
                    ]
                }
            ).populate('detalle.producto', ['descripcion', 'precio']).populate('vendedor', 'nombre');
            if (rtaVenta.length == 0) {
                let fecha1 = new Date(ventaId);
                if (fecha1.toString() != "Invalid Date") {
                    let fecha2 = new Date(ventaId);
                    fecha2.setDate(fecha2.getDate() + 1);
                    rtaVenta = await Venta.find(
                        {
                            fecha:
                                { $gte: fecha1, $lt: fecha2 }

                        }
                    ).populate('detalle.producto', ['descripcion', 'precio']).populate('vendedor', 'nombre');          
                }

                if (rtaVenta.length == 0) {
                    let ObjectId = require('mongoose').Types.ObjectId;
                    if (!ObjectId.isValid(ventaId) || !(rtaVenta = await Venta.findById(ventaId).populate('detalle.producto', ['descripcion', 'precio']).populate('vendedor', 'nombre'))) {
                        return res.status(404).json({
                            ok: false,
                            msg: 'La venta no existe'
                        });
                    }
                }
            }
        } else {
            return res.status(201).json({
                ok: false,
                msg: 'La venta no existe'
            });
        }

        res.status(404).json({
            ok: true,
            msg: 'Buscada la venta',
            rtaVenta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al buscar ventas"
        })
    }
};

const actualizarVenta = async (req, res = response) => {
    let { estado, cliente, vendedor, detalle, total } = req.body;
    const ventaId = req.params.id;

    try {
        let ObjectId = require('mongoose').Types.ObjectId;

        if (!ObjectId.isValid(ventaId) || !await Venta.findById(ventaId)) {
            return res.status(404).json({
                ok: false,
                msg: 'La venta no existe'
            });
        }

        const rtaVenta = await Venta.findByIdAndUpdate(ventaId, { estado }, { new: true });

        res.status(201).json({
            ok: true,
            msg: 'Actualizada la venta',
            rtaVenta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al editar el venta"
        })
    }
};

const eliminarVenta = async (req, res = response) => {

    const ventaId = req.params.id;

    try {
        let ObjectId = require('mongoose').Types.ObjectId;

        if (!ObjectId.isValid(ventaId) || !await Venta.findById(ventaId)) {
            return res.status(404).json({
                ok: false,
                msg: 'La venta no existe'
            });
        }

        await Venta.findByIdAndDelete(ventaId);

        res.status(200).json({
            ok: true,
            msg: 'Eliminada la venta'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al borrar la venta"
        })
    }
};



module.exports = {
    listarVenta,
    crearVenta,
    buscarVenta,
    actualizarVenta,
    eliminarVenta
}