// const res = require("express/lib/response")
const bcrypt = require('bcryptjs');
const { response } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'el correo esta registrado'
            })
        }
        usuario = await new Usuario(req.body);
        //encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        //General JsonWEbToken
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'hable con el admin'
        });
    }
};
// const login ... req, res 
// {ok true}
const login = async (req, res = response) => {
    const { email, password } = req.body;
    // console.log(req.body);
    try {
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: true,
                msg: ' no registrada'
            })
        }
        const validPassword = bcrypt.compare(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: true,
                msg: 'Contraseña no es valida'
            });
        }
        const token = await generarJWT(usuarioDB.id);
        return res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        });
    }
};
const renewToken = async (req, res = response) => {
    // comst uid iuid del usuario

    const uidDB = req.uid;
    // conslog.log(req.uid)
    //     //generar un nueviJWT
    //     //General JsonWEbToken
    const token = await generarJWT(uidDB);
    //     //obtener por uid  finbyId

    const usuario = await Usuario.findById(uidDB);
    res.json({
        ok: true,
        usuario,
        token

    })
}
module.exports = {
    crearUsuario,
    login,
    renewToken
}
