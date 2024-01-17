const connection = require('../config/bbdd'); // Asegúrate de tener configurada la conexión a tu base de datos

// Obtener todas las alertas (GET)
const obtenerAlertas = (req, res) => {
  // Consulta SQL para obtener todas las alertas
  const sql = 'SELECT * FROM alertas';

  // Realizar la consulta a la base de datos
  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las alertas de la base de datos' });
    } else {
      res.status(200).json({ alertas: results });
    }
  });
};

// Obtener una alerta por su ID (GET)
const obtenerAlerta = (req, res) => {
  const { id } = req.params;

  // Consulta SQL para obtener una alerta por su ID
  const sql = 'SELECT * FROM alertas WHERE id = ?';

  // Realizar la consulta a la base de datos
  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la alerta de la base de datos' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Alerta no encontrada' });
      } else {
        res.status(200).json({ alerta: results[0] });
      }
    }
  });
};

// Crear una nueva alerta (POST)
const crearAlerta = (req, res) => {
  const { descripcion, ubicacion } = req.body;

  // Consulta SQL para insertar una nueva alerta en la base de datos
  const sql = 'INSERT INTO alertas (descripcion, ubicacion) VALUES (?, ?)';

  // Realizar la inserción en la base de datos
  connection.query(sql, [descripcion, ubicacion], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la alerta en la base de datos' });
    } else {
      // Obtener el ID de la alerta recién creada
      const alertaId = results.insertId;
      res.status(201).json({ message: 'Alerta creada exitosamente', alertaId });
    }
  });
};

// Actualizar una alerta por su ID (PUT)
const actualizarAlerta = (req, res) => {
  const { id } = req.params;
  const { descripcion, ubicacion } = req.body;

  // Consulta SQL para actualizar una alerta por su ID
  const sql = 'UPDATE alertas SET descripcion = ?, ubicacion = ? WHERE id = ?';

  // Realizar la actualización en la base de datos
  connection.query(sql, [descripcion, ubicacion, id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la alerta en la base de datos' });
    } else {
      res.status(200).json({ message: 'Alerta actualizada exitosamente' });
    }
  });
};

// Borrar una alerta por su ID (DELETE)
const borrarAlerta = (req, res) => {
  const { id } = req.params;

  // Consulta SQL para borrar una alerta por su ID
  const sql = 'DELETE FROM alertas WHERE id = ?';

  // Realizar el borrado en la base de datos
  connection.query(sql, [id], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al borrar la alerta de la base de datos' });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = {
  obtenerAlertas,
  obtenerAlerta,
  crearAlerta,
  actualizarAlerta,
  borrarAlerta,
};
