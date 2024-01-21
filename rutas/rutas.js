const express = require('express');
const router = express.Router();
const { obtenerIncedencias, crearIncidencia, usuarioCrearAlerta, editarIncidencia, borrarIncidencia } = require('../controladores/incidenciaControlador');
const { obtenerAlertas, obtenerAlerta, crearAlerta, editarAlerta, borrarAlerta, validarAlerta } = require('../controladores/alertaControlador');
const { obtenerUsuarios, obtenerUsuario, eliminarUsuario, actualizarDatoUsuario, crearUsuario } = require('../controladores/usuariosControlador');
const { obtenerCamaras } = require('../controladores/camarasControlador');

// Peticiones GET
router.get('/usuarios', obtenerUsuarios); //obtienen usuario creado
router.get('/usuarios/:email', obtenerUsuario); //obtiene un usuario por su id
router.get('/incidencias', obtenerIncedencias);//obtiene las 20 incidencias mas recientes de la base de datos
// router.get('/incidenciaAdmin', obtenerIncidenciaAdmin);//obtiene una unica incidencia confirmada por el administrador
router.get('/camaras', obtenerCamaras);//obtiene camaras(por definir)


// Peticiones PUT/PATCH
// router.put('/incidencia', editarIncidencia);//edita una incidencia ya validada
// router.put('/validarAlerta', validarAlerta);//convierte una Alerta en una incidencia
router.put('/usuarios/:email', actualizarDatoUsuario);


//Peticiones POST
router.post('/usuarios', crearUsuario);
// router.post('/incidencia', crearIncidencia);//crear una nueva incidencia 


//Peticiones DELETE
// router.delete('/incidencia', deleteIncidencia);//borrar incidencia 
router.delete('/usuarios/:email', eliminarUsuario);//borra usuario

module.exports = router