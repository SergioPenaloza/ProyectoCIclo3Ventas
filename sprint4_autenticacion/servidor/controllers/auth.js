const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, resp = response) => {
    // console.log(req.Body);

    //const {name, email, password} = req.body;

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return resp.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario registrado con ese eamil'
            });
        }

        usuario = new Usuario(req.body);

        /** Encriptar constraseña */
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //** Inserción en la colección de usuarios */
        await usuario.save();

        resp.status(201).json({
            ok: true,
            msg: 'registro',
            uid: usuario.id,
            name: usuario.name
        });
    } catch (error) {
        console.log(error);

        resp.status(500).json({
            ok: false,
            msg: 'Error al guardar usuario'
        });
    }
}

const loginUsuario = async (req, resp = response) => {

    const { email, password } = req.body;

    try {

        /**Confirmar email */
        let usuario = await Usuario.findOne({ email }); 
        
        if(!usuario) {
            resp.status(400).json({
                ok: true,
                msg: 'Usuario o contraseña erradas'
            });
        }

        /**Confirmar email */

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword) {
            resp.status(400).json({
                ok: true,
                msg: 'Usuario o contraseña erradas'
            });
        }

        /**Generar Token */
        const token = await generarJWT(usuario.id, usuario.name);

        resp.json({
            ok: true,
            msg: 'Ok',
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: 'error al autenticar',
        });
    }    
}

const revalidarToken = async (req, resp = response) => {

    //** Esta destructutación es posible porque en el middleware de 'validar-jwt.js' se le inyectaron
    // esos campos al 'req' con el fin de ser utilziados en la creación del nuevo token (generarJWT) */
    const { uid, name } = req;

    /**Generar Nuevo Token */
    const token = await generarJWT(uid, name);

    resp.json({
        ok: true,
        token: token
    });
}

const googleLogin = async (req, resp = response) => {

    const {uid: idToken, name, email} = req;

    try {
        //** .populate trae los datos de esa llave */
        let usuario = await Usuario
        .findOne({
            email, 
            idToken
        })
        .populate('rol');

        if(usuario) {
            if(usuario.rol.name==='Indefinido'){
                resp.status(401).json({
                    ok: false,
                    msg: 'Usuario no autorizado por el admin'
                });
            } else {
                const token = await generarJWT(usuario.id, usuario.name);
                resp.json({
                    ok: true,
                    msg: 'Ok',
                    uid: usuario.id,
                    name: usuario.name,
                    token
                });
            }
        } else{
            usuario = new Usuario({
                name,
                email,
                password: idToken,
                idToken
            });

            const newUser = await usuario.save();
            resp.status(201).json({
                ok: true,
                msg: 'Usuario creado con exito',
                uid: newUser.id,
                name: newUser.name
            })
        }
        
    } catch (error) {
        
    }

    resp.json({
        ok: true,
        msg: "Google login exitoso"
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    googleLogin
};