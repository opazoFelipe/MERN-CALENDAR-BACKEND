// No vuelve a cargar la libreria, usa la que ya esta cargada desde el index
const { response } = require('express')
const bcrypt = require('bcryptjs')
const { encriptarPassword } = require('../helpers/bcrypt')
const Usuario = require('../models/Usuario')

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body

    try {
        let usuario = await Usuario.findOne({ email })

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo',
            })
        }

        usuario = new Usuario( req.body )

        // Encriptar Contraseña
        usuario.password = encriptarPassword(password)

        await usuario.save()
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        })
    }
}

const loginUsuario = (req, res = response) => {
    const { email, password } = req.body

    res.json({
        ok: true,
        msg: 'login'
    })
}

const revalidarToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}