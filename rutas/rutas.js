const express = require('express');
const router = express.Router();
const { obtenerIncidenciasAPI, obtenerIncidenciasBBDD, crearIncidencia, editarIncidencia, borrarIncidencia, obtenerIncidenciaIndividual } = require('../controladores/incidenciaControlador');
const { obtenerUsuarios, obtenerUsuario, eliminarUsuario, actualizarDatoUsuario, crearUsuario } = require('../controladores/usuariosControlador');
const { obtenerCamaras } = require('../controladores/camarasControlador');

//***** API Open Data - API Euskalgida *****

router.get('/incidenciasAPI', obtenerIncidenciasAPI);//obtiene las 20 incidencias mas recientes de la base de datos
router.get('/camaras', obtenerCamaras);//obtiene camaras(por definir)




//***** API Euskalgida <---> Android/Electron ****
router.get('/usuarios', obtenerUsuarios); //obtienen usuario creado
router.get('/usuarios/:email', obtenerUsuario); //obtiene un usuario  por su id
router.post('/usuarios', crearUsuario);
router.put('/usuarios/:email', actualizarDatoUsuario);
router.delete('/usuarios/:email', eliminarUsuario);//borra usuario


router.get('/incidencia', obtenerIncidenciasBBDD);//obtiene la incidencia desde la BBDD
router.get('/incidencia/:idIncidencia', obtenerIncidenciaIndividual);//obtiene la incidencia desde la BBDD

router.post('/incidencia', crearIncidencia);//crear una nueva incidencia 
router.put('/incidencia/:idIncidencia', editarIncidencia);//edita una incidencia ya validada
router.delete('/incidencia/:idIncidencia', borrarIncidencia);//borrar incidencia 




module.exports = router