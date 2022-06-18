
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) => {

    const desdes = Number(req.query.desde) || 0;

    //listar de forma desende de forma conectados
    //filtro para quitar mis datos en esta consulta y el skip aplica un filtro del numero de datos a regresar
    // const usuarios = await Usuario.find({ _id: { $ne: req.uid } }).sort('-online').skip(desdes).limit(5);
    const usuarios = await Usuario.find({ _id: { $ne: req.uid } }).sort('-online').skip(desdes);


    //{ok: true, msg: 'getusuarios'}
    res.json({
        ok: true,
        usuarios,
        desdes
    })

}

module.exports = {
    getUsuarios
}
