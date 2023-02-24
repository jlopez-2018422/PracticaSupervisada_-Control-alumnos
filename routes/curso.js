const {Router} = require('express');
const {getCurso, postCurso, putCurso, deleteCurso, asignarAlumno} = require('../controllers/curso');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esMaestroRole } = require('../middlewares/validar-roles');

const router = Router();
router.get('/mostrar',[
    validarJWT,
    esMaestroRole
], getCurso);

router.post('/agregar',[
    validarJWT,
    esMaestroRole
], postCurso);

router.put('/editar/:id',[
    validarJWT
], putCurso);

router.delete('/eliminar/:id',[
    validarJWT,
    esMaestroRole
], deleteCurso);

router.get('/asignar/:idCurso',[
    validarJWT,
], asignarAlumno);
module.exports = router;
