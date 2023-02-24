const {request, response} = require('express');

const User = require('../models/user');

const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');


const login = async( req = request, res = response ) => {

    const {email, password} = req.body;

    try {

        // Verificar si el correo existe o es valido.

        const user = await User.findOne( { email} );
        if ( !user ) {
            return res.status(400).json({

                msg: 'El correo es incorrecto'
            })
        }
        //Verificar si el usuario existe o es valido.

        if (!user){
            return res.status(202).json({
                msg: 'Usuario inexistente'
            })
        }
            
        // Validar la password del usuario

        if (!bcryptjs.compareSync( password, user.password )) {
            return res.status(400).json({
                msg: 'La password es incorrecta'


            })
        }

        const token = await generarJWT(user.id);
    
        res.json({
            msg: 'Login funcional',
            email,
            password,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }

}

module.exports= {
    login
}