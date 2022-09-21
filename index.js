const express = require("express");
require('dotenv').config()
const { dbConnection } = require('./src//database/config')

// Crear el servidor de Express
const app = express()

// Base de datos
dbConnection()

// Configurar el servidor
app.set('port', process.env.PORT)

// Directorio Publico o archivos estaticos
app.use(express.static('public'))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// Rutas
// TODO: auth // crear, login, renew
// TODO: CRUD: Eventos

app.use('/api/auth', require('./src/routes/auth'))


// Escuchar Peticiones
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${ app.get('port') }`)
})