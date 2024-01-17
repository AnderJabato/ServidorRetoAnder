const express = require('express');
const axios = require('axios');


// Ruta para obtener incidencias de la API de Open Data (GET)
const obtenerIncedencias = async (req, res) => {
  try {
    // Realizar una solicitud GET a la API de Open Data
    const data = await axios.get('https://api.euskadi.eus/traffic/v1.0/incidences?_page=1');
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

const crearIncidencia = async (req, res) => {
  try {
    // Obtén los datos de la nueva incidencia desde el cuerpo de la solicitud
    const nuevaIncidencia = req.body;

    // Realiza la inserción en la base de datos
    const query = 'INSERT INTO incidencias (ciudad, provincia, fechaInicio) VALUES (?, ?, ?)';
    const values = [nuevaIncidencia.campo1, nuevaIncidencia.campo2, nuevaIncidencia.campo3];

    // Ejecuta la consulta
    const result = await pool.query(query, values);

    // Devuelve la respuesta
    res.status(201).json({ incidencia: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la incidencia en la base de datos' });
  }
};


// Ruta para crear una nueva incidencia (POST)
const usuarioCrearAlerta = async (req, res) => {
  try {
    // Obtén los datos de la nueva incidencia desde el cuerpo de la solicitud
    const nuevaIncidencia = req.body;

    // crear una nueva incidencia en la base de datos
    //QUERY post

    // Verificar si la solicitud fue exitosa
    if (response.status === 201) {
      // Obtener los datos de la incidencia creada desde la respuesta
      const incidenciaCreada = response.data;

      // Devolver los datos de la incidencia creada como respuesta de tu servidor
      res.status(201).json({ incidencia: incidenciaCreada });
    } else {
      // Manejar otros códigos de estado si es necesario
      res.status(response.status).json({ message: 'Error al crear la incidencia en el servidor' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en la solicitud al servidor' });
  }
};

const editarIncidencia = async (req, res) => {
  try {
    // Obtén el ID de la incidencia a actualizar desde los parámetros de la solicitud
    const { id } = req.params;
    // Obtén los datos actualizados de la incidencia desde el cuerpo de la solicitud
    const datosActualizados = req.body;

    // Realiza la actualización en la base de datos
    const query = 'UPDATE incidencias SET campo1 = ?, campo2 = ?, campo3 = ? WHERE id = ?';
    const values = [datosActualizados.campo1, datosActualizados.campo2, datosActualizados.campo3, id];

    // Ejecuta la consulta
    await pool.query(query, values);

    // Devuelve la respuesta
    res.status(200).json({ message: 'Incidencia actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la incidencia en la base de datos' });
  }
};


// Ruta para borrar una incidencia existente (DELETE)
const borrarIncidencia = async (req, res) => {
  try {
    // Obtén el ID de la incidencia a borrar desde los parámetros de la solicitud
    const { id } = req.params;

    // Realiza el borrado en la base de datos
    const query = 'DELETE FROM incidencias WHERE id = ?';
    const values = [id];

    // Ejecuta la consulta
    await pool.query(query, values);

    // Devuelve la respuesta
    res.status(204).json({ message: 'Incidencia borrada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al borrar la incidencia en la base de datos' });
  }
};

module.exports = {
  obtenerIncedencias,
  usuarioCrearAlerta,
  crearIncidencia,
  editarIncidencia,
  borrarIncidencia
}