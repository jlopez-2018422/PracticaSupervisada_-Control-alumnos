const {Router} = require('express');
const { login } = require('../controllers/auth');
const router = Router();
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');


router.post('/login', login);



module.exports = router;

