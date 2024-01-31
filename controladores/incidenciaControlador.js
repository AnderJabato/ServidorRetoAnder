const axios = require('axios');
require('dotenv').config()
const connection = require('../config/bbdd')


// Ruta para obtener incidencias de la API de Open Data (GET)
const obtenerIncidenciasAPI = async (req, res) => {
  try {

    
    // Realizar una solicitud GET a la API de Open Data
    const data = await axios.get(process.env.API_EUSKALGIDA);
    //mapear los  20 incidencias de open data y conparar con los de mi base de datos. Si hay distintos las ultimas las añade.
    // Verificar si la solicitud fue exitosa
    if (data.status === 200) {
      // Obtener los datos de la respuesta
      const incidencias = data.data;

      // Devolver los datos como respuesta de tu servidor
      res.status(200).json({ incidencias });
    } else {
      // Manejar otros códigos de estado si es necesario
      res.status(response.status).json({ message: 'Error al obtener datos de la API de Open Data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en la solicitud a la API de Open Data' });
  }
}

const obtenerIncidenciasBBDD = async (req, res) => {
  // Realiza la consulta en la base de datos
  const query = `
    SELECT * FROM Incidencias`;

  // Ejecuta la consulta
  connection.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener la incidencia de la base de datos' });
      return;
    }
    res.status(200).json({
      data: result
    })
  });
}

const obtenerIncidenciaIndividual = async (req, res) => {
  // Obtén el idIncidencia del registro que quieres obtener
  const { idIncidencia } = req.params;

  // Realiza la consulta en la base de datos
  const query = `
    SELECT * FROM Incidencia
    WHERE idIncidencia = ?
`;

  // Ejecuta la consulta
  connection.query(query, [idIncidencia], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener la incidencia de la base de datos' });
      return;
    }
    res.status(200).json({
      data: result
    })
  });
}



const crearIncidencia = async (req, res) => {
  // Obtén los datos de la nueva incidencia desde el cuerpo de la solicitud
  const nuevaIncidencia = req.body;
   console.log(nuevaIncidencia)
  // Realiza la inserción en la base de datos
  const query = `
    INSERT INTO Incidencias (
        idIncidencia, nombreIncidencia, tipoIncidencia, causa, descripcionIncidencia,
        fechaInicio, fechaFin, regionAutonoma, provincia, ciudad,
        direccion, carretera, registroVehiculo, idFuente, nivelIncidencia,
        latitud, longitud, pkInicio, pkFin, incidenciaValidada, foto
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  /* 

  o Meteorológica
o Accidente
o Retención
o Seguridad vial
o Otras incidencias
o Puertos de montaña
o Vialidad invernal tramos
o Pruebas deportivas

  INSERT INTO Incidencia
  VALUES
    (3, 'Corte de energía', 'Corte de energía', 'Falla en la subestación eléctrica',
      'Descripción detallada del corte de energía.', '2024-01-22', '2024-01-23',
      'Madrid', 'Madrid', 'Ciudad B', 'Calle Secundaria 789', NULL, NULL, 2,
      'Moderado', 40.4167, -3.7038, 5.0, 15.0, NULL, 0);
  */

  const values = [
    nuevaIncidencia.idIncidencia,
    nuevaIncidencia.nombreIncidencia,
    nuevaIncidencia.tipoIncidencia,
    nuevaIncidencia.causa,
    nuevaIncidencia.descripcionIncidencia,
    nuevaIncidencia.fechaInicio,
    nuevaIncidencia.fechaFin,
    nuevaIncidencia.regionAutonoma,
    nuevaIncidencia.provincia,
    nuevaIncidencia.ciudad,
    nuevaIncidencia.direccion,
    nuevaIncidencia.carretera,
    nuevaIncidencia.registroVehiculo,
    nuevaIncidencia.idFuente,
    nuevaIncidencia.nivelIncidencia,
    nuevaIncidencia.latitud,
    nuevaIncidencia.longitud,
    nuevaIncidencia.pkInicio,
    nuevaIncidencia.pkFin,
    nuevaIncidencia.incidenciaValidada,
    nuevaIncidencia.foto
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al insertar la incidencia en la base de datos' });
      return;
    }
    res.status(200).json({
      data: result
    })
  })
};


const editarIncidencia = async (req, res) => {

  // Obtén el ID de la incidencia a actualizar desde los parámetros de la solicitud
  const { idIncidencia } = req.params;
  // Obtén los datos actualizados de la incidencia desde el cuerpo de la solicitud
  const datosActualizados = req.body;

  // Construye dinámicamente la parte SET de la consulta
  const camposParaActualizar = Object.keys(datosActualizados).map(campo => `${campo} = ?`).join(', ');

  // Realiza la actualización en la base de datos
  const query = `UPDATE Incidencia SET ${camposParaActualizar} WHERE idIncidencia = ?`;
  const values = [...Object.values(datosActualizados), idIncidencia];

  // Ejecuta la consulta
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al actualizar la incidencia de la base de datos' });
      return;
    }
    res.status(200).json({
      data: result
    })
  })
};

// Ruta para borrar una incidencia existente (DELETE)
const borrarIncidencia = async (req, res) => {

  // Obtén el ID de la incidencia a borrar desde los parámetros de la solicitud
  const { idIncidencia } = req.params;

  // Realiza el borrado en la base de datos
  const query = 'DELETE FROM Incidencia WHERE idIncidencia = ?';

  // Ejecuta la consulta
  connection.query(query, [idIncidencia], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al borrar la incidencia de la base de datos' });
      return;
    }
    res.status(200).json({
      data: result
    })
  })

};

module.exports = {
  obtenerIncidenciasAPI,
  obtenerIncidenciasBBDD,
  obtenerIncidenciaIndividual,
  crearIncidencia,
  editarIncidencia,
  borrarIncidencia
}