const express = require('express')
const app = express()
const port = 3000
const router = require('./rutas/rutas')
require('dotenv').config()
//const connection = require('./config/bbdd')

app.use(express.json());

app.use('/api', router)

app.listen(port, () => {
  console.log(`Servidor levantado y escuchando en el puerto ${port}`)
})