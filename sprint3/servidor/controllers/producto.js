const { responde } = require('express');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const listarProducto = async (req,res = response)=>{

    try {
        const  rtaProducto = await Producto.find().populate('categoria','nombre');
        
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

const crearProducto = async (req,res = response)=>{

    const { descripcion, precio, estado, categoria } = req.body;

    try {
        let  rtaPproducto = await Producto.findOne({descripcion:{ $regex: descripcion, $options:'i' } });

        if(rtaPproducto){
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un producto con este nombre'
            });    
        }

        let ObjectId = require('mongoose').Types.ObjectId;

        if(!ObjectId.isValid(categoria) || !await Categoria.findById(categoria)){
            return res.status(404).json({
                ok: false,
                msg: 'La categoria no existe'
            });    
        }

        rtaPproducto = new Producto(req.body);

        await rtaPproducto.save();
        
        res.status(201).json({
            ok: true,
            msg: 'Registrado el producto',
            rtaPproducto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al guardar el producto"
        })
    }
};

const buscarProducto = async (req,res = response)=>{

    const productoId = req.params.id;

    try {
        let ObjectId = require('mongoose').Types.ObjectId;

        if(!ObjectId.isValid(productoId) || !(rtaPproducto = await Producto.findById(productoId))){
            return res.status(404).json({
                ok: false,
                msg: 'El producto no existe'
            });    
        }

        res.status(200).json({
            ok: true,
            msg: 'Buscado el producto',
            rtaPproducto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al listar productos"
        })
    }
};

const actualizarProducto = async (req,res = response)=>{
    const { descripcion, precio, estado, categoria } = req.body;
    
    const productoId = req.params.id;

    try {
        let ObjectId = require('mongoose').Types.ObjectId;

        if(!ObjectId.isValid(productoId) || !await Producto.findById(productoId)){
            return res.status(404).json({
                ok: false,
                msg: 'El producto no existe'
            });    
        }

        producto1 = await Producto.findOne(
            { $and: [ { descripcion: { $regex: descripcion, $options:'i' } } , { _id: { $ne: productoId } } ] } );
        if(producto1){
            return res.status(404).json({
                ok: false,
                msg: 'Ya existe un producto con este nombres'
            });    
        }

        ObjectId = require('mongoose').Types.ObjectId;

        if(!ObjectId.isValid(categoria) || !await Categoria.findById(categoria)){
            return res.status(404).json({
                ok: false,
                msg: 'La categoria no existe'
            });    
        }

        const rtaProducto = await Producto.findByIdAndUpdate(productoId, req.body, { new:true });
        
        res.json({
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

const eliminarProducto = async (req,res = response)=>{

    const productoId = req.params.id;

    try {
        let ObjectId = require('mongoose').Types.ObjectId;

        if(!ObjectId.isValid(productoId) || !await Producto.findById(productoId)){
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