//hacer las peticiones post, get , delete
/*
path : api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar_campos');

const router = Router();

router.post('/new', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'la password es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),


    validarCampos
    // validaCampos(check('nombre'))

], crearUsuario);

//post /
//validar  email, password


router.post('/', [
    check('password', 'la password es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validarCampos
    // validaCampos(check('nombre'))

], login);

router.get('/renew',validarJWT , renewToken);



module.exports = router;