//hacer las peticiones post, get , delete
/*
path : api/usuarios
*/

const { Router } = require('express');
const {getUsuarios} = require('../controllers/usurios')
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT,  getUsuarios);



module.exports = router;