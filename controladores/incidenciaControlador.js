const axios = require('axios');
require('dotenv').config();
const connection = require('../config/bbdd'); // Asegúrate de que este módulo exporta una conexión MySQL que soporta promesas (como mysql2).

// Ruta para obtener incidencias de la API de Open Data (GET)
const obtenerIncidenciasAPI = async (req, res) => {
  try {
    const data = await axios.get(process.env.API_OPENDATA);
    if (data.status === 200) {
      const incidencias = data.data.incidences;
      
      for (let i = 0; i < incidencias.length; i++) {
        const incidencia = incidencias[i];
        const existente= await connection.query('SELECT * FROM Incidencias WHERE idIncidencia = ?', [incidencia.incidenceId]);
        //asegurarse que mas robusto

        if (existente._results.length == 0) {
          console.log(incidencias.length)
          const query = `
            INSERT INTO Incidencias (
              idIncidencia, nombreIncidencia, tipoIncidencia, causa, descripcionIncidencia,
              fechaInicio, regionAutonoma, provincia, ciudad,
              direccion, carretera, registroVehiculo, idFuente, nivelIncidencia,
              latitud, longitud, pkInicio, pkFin, incidenciaValidada, foto
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const values = [
            incidencia.incidenceId,
            incidencia.province + incidencia.cityTown,
            incidencia.incidenceType,
            incidencia.cause,
            null,
            incidencia.startDate,
            incidencia.autonomousRegion,
            incidencia.province,
            incidencia.cityTown,
            incidencia.direction,
            incidencia.road,
            incidencia.carRegistration,
            incidencia.sourceId,
            incidencia.incidenceLevel,
            incidencia.latitude,
            incidencia.longitude,
            incidencia.pkStart,
            incidencia.pkEnd,
            true,
            null
          ];

          await connection.query(query, values, (err, result)=>{ 
            if (err) {
              console.log(err)
              res.status(500).json({
                message: "Error al obtener la info de la base de datos"
              })
              return
            }
          } );
        }
      }

      res.status(200).json({ message: "Incidencias procesadas correctamente", incidencias });
    } else {
      res.status(data.status).json({ message: 'Error al obtener datos de la API de Open Data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en la solicitud a la API de Open Data o en la inserción en la base de datos' });
  }
};

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
const obtenerAlertas= async (req, res) => {
  // Realiza la consulta en la base de datos
  const query = `
  SELECT * FROM Incidencias WHERE incidenciaValidada = FALSE`;

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
    SELECT * FROM Incidencias
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
        fechaInicio, regionAutonoma, provincia, ciudad,
        direccion, carretera, registroVehiculo, idFuente, nivelIncidencia,
        latitud, longitud, pkInicio, pkFin, incidenciaValidada, foto
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    nuevaIncidencia.privincia + nuevaIncidencia.tipoIncidencia,
    nuevaIncidencia.tipoIncidencia,
    nuevaIncidencia.causa,
    nuevaIncidencia.descripcionIncidencia,
    nuevaIncidencia.fechaInicio,
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
    false,
    null
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

const crearAlerta = async (req, res) => {
  // Obtén los datos de la nueva incidencia desde el cuerpo de la solicitud
  const nuevaAlerta = req.body;
  console.log(nuevaAlerta)
  // Realiza la inserción en la base de datos
  const query = `
    INSERT INTO Incidencias (
        idIncidencia, nombreIncidencia, tipoIncidencia, causa, descripcionIncidencia,
        fechaInicio, regionAutonoma, provincia, ciudad,
        direccion, carretera, registroVehiculo, idFuente, nivelIncidencia,
        latitud, longitud, pkInicio, pkFin, incidenciaValidada, foto
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    nuevaAlerta.idIncidencia,
    nuevaAlerta.provincia + nuevaAlerta.tipoIncidencia,
    nuevaAlerta.tipoIncidencia,
    nuevaAlerta.causa,
    nuevaAlerta.descripcionIncidencia,
    nuevaAlerta.fechaInicio,
    nuevaAlerta.regionAutonoma,
    nuevaAlerta.provincia,
    nuevaAlerta.ciudad,
    nuevaAlerta.direccion,
    nuevaAlerta.carretera,
    nuevaAlerta.registroVehiculo,
    nuevaAlerta.idFuente,
    nuevaAlerta.nivelIncidencia,
    nuevaAlerta.latitud,
    nuevaAlerta.longitud,
    nuevaAlerta.pkInicio,
    nuevaAlerta.pkFin,
    false,
    null
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al insertar la alerta en la base de datos' });
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
  const query = 'DELETE FROM Incidencias WHERE idIncidencia = ?';

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
  obtenerAlertas,
  obtenerIncidenciaIndividual,
  crearIncidencia,
  crearAlerta,
  editarIncidencia,
  borrarIncidencia
}