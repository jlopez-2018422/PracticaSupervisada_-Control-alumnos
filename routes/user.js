const {Router} = require('express');
const { getUsers, postUser, putUser, deleteUser, registerUser, getMyCourses, deleteMyUser, putMyUser } = require('../controllers/user');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();
router.get('/mostrar', getUsers);
router.post('/agregar', postUser);
router.put('/editar/:id', putUser);
router.delete('/eliminar/:id', deleteUser);
router.post('/registrar', registerUser);
router.get('/myCourses',[
    validarJWT
] ,getMyCourses);
router.delete('/eliminarMiUsuario/:id',[
    validarJWT
], deleteMyUser);
router.put('/editarMiUsuario/:id',[
    validarJWT
], putMyUser)



module.exports = router;
