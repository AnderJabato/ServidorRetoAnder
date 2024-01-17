const connection = require('../config/bbdd')

const obtenerUsuarios = (req, res) => {
  // Obtener informacion de la base de datos
  connection.query('SELECT * FROM usuarios', (err, result) => {

    if (err) {
      console.log(err)
      res.status(500).json({
        message: "Error al obtener la info de la base de datos"
      })
      return
    }

    // Devolver la info con JSON
    res.status(200).json({
      data: result
    })
  })

}

const obtenerUsuario = (req, res) => {
  const { id } = req.params
}

module.exports = {
  obtenerUsuarios,
  obtenerUsuario
}