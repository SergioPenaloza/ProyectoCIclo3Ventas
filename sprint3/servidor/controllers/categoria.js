const { responde } = require('express');
const Categoria = require('../models/categoria');

const listarCategoria = async (req,res = response)=>{

    try {
        const  rtaCategoria = await Categoria.find();
        
        res.status(200).json({
            ok: true,
            msg: 'Lista de categorias',
            rtaCategoria   
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al listar las categorias"
        })
    }
};

const crearCategoria = async (req, res = response)=>{
    const { nombre } = req.body;

    try {
        let  rtaCategoria = await Categoria.findOne({nombre:{ $regex: nombre, $options:'i' } });

        if(rtaCategoria){
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una categoria con este nombre'
            });    
        }
        
        rtaCategoria = new Categoria(req.body);

        await rtaCategoria.save();
        
        res.status(201).json({
            ok: true,
            msg: 'Registrada la categoria',
            rtaCategoria
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al registar la categoria"
        })
    }
};

const buscarCategoria = async (req,res = response)=>{

    const categoriaId = req.params.id;

    try {
        let ObjectId = require('mongoose').Types.ObjectId;

        if(!ObjectId.isValid(categoriaId) || !(rtaCategoria = await Categoria.findById(categoriaId))){
            return res.status(404).json({
                ok: false,
                msg: 'La categoria no existe**'
            });    
        }

        res.status(200).json({
            ok: true,
            msg: 'Buscada la categoria',
            rtaCategoria
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al buscar categoria"
        })
    }
};

const actualizarCategoria = async (req,res = response)=>{
    const { nombre } = req.body;
    
    const categoriaId = req.params.id;

    try {
        let ObjectId = require('mongoose').Types.ObjectId;

        if(!ObjectId.isValid(categoriaId) || !await Categoria.findById(categoriaId)){
            return res.status(404).json({
                ok: false,
                msg: 'La categoria no existe'
            });    
        }

        rtaCategoria = await Categoria.findOne(
            { $and: [ { nombre: { $regex: nombre, $options:'i' } } , { _id: { $ne: categoriaId } } ] } );
        if(rtaCategoria){
            return res.status(404).json({
                ok: false,
                msg: 'Ya existe una categoria con este nombre'
            });    
        }

        rtaCategoria = await Categoria.findByIdAndUpdate(categoriaId, req.body, { new:true });
        
        res.json({
            ok: true,
            msg: 'Actualizada la catgoria',
            rtaCategoria
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al editar categoria"
        })
    }
};

const eliminarCategoria = async (req,res = response)=>{

    const categoriaId = req.params.id;

    try {
        let ObjectId = require('mongoose').Types.ObjectId;

        if(!ObjectId.isValid(categoriaId) || !await Categoria.findById(categoriaId)){
            return res.status(404).json({
                ok: false,
                msg: 'La categoria no existe'
            });    
        }

        await Categoria.findByIdAndDelete(categoriaId);
        
        res.status(200).json({
            ok: true,
            msg: 'Eliminada la categoria'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al borrar la categoria"
        })
    }
};

// const crearCategoria = (req,res = response)=>{
//         res.status(201).json({
//             ok: true,
//             msg: 'registrado'
//         });
// };

module.exports = {
    listarCategoria, 
    crearCategoria,
    buscarCategoria,
    actualizarCategoria,
    eliminarCategoria
}