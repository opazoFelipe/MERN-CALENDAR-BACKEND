const { response } = require('express')
const { decodificarToken } = require('../helpers/jwt')

const validarJWT = async (req, res = response, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { uid, name } = decodificarToken(token)

        req.uid = uid
        req.name = name

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next()
}

module.exports = {
    validarJWT
}