const connection = require('../config/bbdd')

const obtenerUsuarios = (req, res) => {
  // Obtener informacion de la base de datos
  const query = 'SELECT * FROM Usuario'
  connection.query(query, (err, result) => {

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
  const { email } = req.params

  // Obtener el usuario de la bbdd
  const query = `SELECT * FROM Usuario WHERE idUsuario = '${email}'`

  connection.query(query, (err, result) => {
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

const crearUsuario = (req, res) => {
  const data = req.body

  // Metemos la nueva info en bbdd
  const query = `INSERT INTO Usuario SET ?`
  connection.query(query, data, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        message: "Error al obtener la info de la base de datos"
      })
      return
    }
    res.status(200).json({
      data: result
    })
  })
}

const actualizarDatoUsuario = (req, res) => {
  const { email } = req.params
  const data = req.body

  // Conectar y editar en la bbdd
  const query = `UPDATE Usuario SET ${data} WHERE idUsuario = '${email}'`
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        message: "Error al obtener la info de la base de datos"
      })
      return
    }
    res.status(200).json({
      data: result
    })
  })
}

const eliminarUsuario = (req, res) => {
  const { email } = req.params
  console.log('eliminando')

  // Eliminar el usuario de la bbdd
  const query = `DELETE FROM Usuario WHERE idUsuario = '${email}'`
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        message: "Error al obtener la info de la base de datos"
      })
      return
    }
    res.status(200).json({
      data: result
    })
  })
}

module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  actualizarDatoUsuario,
  eliminarUsuario,
  crearUsuario
}