// No vuelve a cargar la libreria, usa la que ya esta cargada desde el index
const { response } = require('express')
const Usuario = require('../models/Usuario')
const { encriptarPassword, compararPassword } = require('../helpers/bcrypt')
const { generarJWT } = require('../helpers/jwt')

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

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        })
    }
}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body

    try {
        const usuario = await Usuario.findOne({ email })

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                // msg: 'Usuario o contraseña incorrecto',
                msg: 'El correo no existe',
            })
        }

        // Confirmar Contraseñas
        const validPassword = compararPassword(password, usuario.password)
        
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password Incorrecto'
            })
        }
    
        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        })
    }
}

const revalidarToken = async (req, res = response) => {

    const { uid, name } = req

    // Todo: generar un nuevo JWT y retornarlo en esta peticion

    const token = await generarJWT( uid, name )

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}


