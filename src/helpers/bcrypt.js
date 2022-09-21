const bcrypt = require('bcryptjs')

const encriptarPassword = (plainTextPassword) => {
    if (!plainTextPassword) {
        throw new Error('No tenemos contraseña para encriptar')
    }

    // Una vez encriptada la constraseña es imposible recuperarla en texto plano
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(plainTextPassword, salt)
}

const compararPassword = (plainTextPassword, savedPassword) => {
    

}

module.exports = {
    encriptarPassword,
    compararPassword
}