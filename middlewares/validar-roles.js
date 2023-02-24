const {request, response} = require('express');
const esMaestroRole = (req = request, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Antes de validar tu rol, inicia sesion'
        })
    }

    const {role, nombre} = req.user
    if(role != 'ROLE_MAESTRO'){
        return res.status(401).json({
            msg: 'Debes ser un maestro para realizar esta acción'

        })
    }



    next();
}

const esAlumnoRole = (req = request, res = response) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Antes de validar tu rol, inicia sesion'
        })
    }
}
module.exports = {
    esMaestroRole,
    esAlumnoRole
}