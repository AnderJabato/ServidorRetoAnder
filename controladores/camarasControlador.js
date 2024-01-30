const obtenerCamaras = async (req, res) => {
  try {
    // Realizar una solicitud GET a la API de Open Data
    const response = await axios.get('https://api.euskadi.eus/traffic/v1.0/cameras');

    // Verificar si la solicitud fue exitosa
    if (response.status === 200) {
      // Obtener los datos de la respuesta
      const data = response.data;

      // Devolver los datos como respuesta de tu servidor
      res.status(200).json({ data });
    } else {
      // Manejar otros códigos de estado si es necesario
      res.status(response.status).json({ message: 'Error al obtener datos de la API de Open Data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en la solicitud a la API de Open Data' });
  }
};


//Exportar
module.exports = {
  obtenerCamaras
}