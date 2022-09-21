const jwt = require('jsonwebtoken')

const generarJWT = (uid, name) => {

    // Retornar promesa para poder llamar la funcion con async/await afuera
    return new Promise((resolve, reject) => {

        const payload = { uid, name }

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {

            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            }

            resolve( token )
        })
    })
}

const decodificarToken = (plainTextToken) => {    
    return jwt.verify( plainTextToken, process.env.SECRET_JWT_SEED)
}

module.exports = {
    generarJWT,
    decodificarToken
}