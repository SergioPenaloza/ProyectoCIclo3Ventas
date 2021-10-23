const { response } = require('express');
const { OAuth2Client } = require('google-auth-library');
const { subscribe } = require('../routes/auth');
// process.env.IDOAuth2Client contiene el ID del cliente generedado en Google Cloud Platform
const client = new OAuth2Client(process.env.IDOAuth2Client);

const validarGoogle = (req, res = response, next) => {

    /** Método: Authorization > Bearer token */
    let token = '';
    token = req.headers['x-access-token'] || req.headers['authorization'];

    // console.log(token);

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se ha proporcionado un token valido'
        });
    }

    /** Método: Authorization > Bearer token */
    if(token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    // console.log(token);

    try {
        //** client.verifyIdToken es una promesa 
        // .then si se ejecuta la promesa de manera exitosa
        // .catch lo recibe si la promesa falla*/        
        client.verifyIdToken({
            idToken: token,
            audience: `${process.env.IDOAuth2Client}`
        })
        .then((resp) => {
            const {sub, name, email} = resp.payload;
            console.log(sub, name, email);
            req.uid = sub;
            req.name = name;
            req.email = email;
            next();
        })
        .catch((error) => {
            return res.status(401).json({
                ok: false,
                msg: 'Token invalido'
            });
        });
                
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        });
    }

}

module.exports = {
    validarGoogle
}