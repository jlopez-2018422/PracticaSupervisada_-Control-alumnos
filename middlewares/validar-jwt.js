const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    
    if ( !token ) {
        return res.status(401).json({
            msg: 'Es necesario un token en el header de la peticion'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );

        const user = await User.findById( uid );
        if ( !user ) {
            return res.status(401).json({
                msg: 'el token no es valido o el usuario no existe'

            });
        }

        req.user = user;
        
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'El token no es valido'

        })
    }

}


module.exports = {
    validarJWT
}