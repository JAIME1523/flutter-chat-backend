const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    token = req.header('x-token');
    // console.log(token);

    if (!token) {
        return res.status(401).json({
            of: false,
            msg: "No hay token en la petición"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            of: false,
            msg: "token no valido"
        })

    }




}

module.exports = {
    validarJWT
}