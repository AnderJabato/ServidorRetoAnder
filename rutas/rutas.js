const express = require('express');
const router = express.Router();
const { obtenerIncedencias, crearIncidencia, usuarioCrearAlerta, editarIncidencia, borrarIncidencia } = require('../controladores/incidenciaControlador');
const { obtenerAlertas, obtenerAlerta, crearAlerta, editarAlerta, borrarAlerta, validarAlerta } = require('../controladores/alertaControlador');
const { obtenerUsuarios } = require('../controladores/usuariosControlador');
const { obtenerCamaras } = require('../controladores/camarasControlador');

// Peticiones GET
//router.get('/usuario', obtenerUsuario);//obtienen usuario creado
router.get('/incidencias', obtenerIncedencias);//obtiene las 20 incidencias mas recientes de la base de datos
router.get('/alertas', obtenerAlertas);//obtiene incidencias creadas por los ususarios que todavia no estan ni validadas ni descartadas.
router.get('/alerta', obtenerAlerta);//obtiene una unica incidencia de usuario
// router.get('/incidenciaAdmin', obtenerIncidenciaAdmin);//obtiene una unica incidencia confirmada por el administrador
router.get('/camaras', obtenerCamaras);//obtiene camaras(por definir)


// Peticiones PUT/PATCH
// router.put('/incidencia', editarIncidencia);//edita una incidencia ya validada
// router.put('/alerta', editarAlerta);//edita una alerta creada por el propio usuario de Android
// router.put('/validarAlerta', validarAlerta);//convierte una Alerta en una incidencia
// router.put('/usuario', editarUsuario);


//Peticiones POST
// router.post('/usuario', crearUsuario);
// router.post('/incidencia', crearIncidencia);//crear una nueva incidencia 
// router.post('/alerta', crearAlerta);//crear una nueva Alerta(Android)


//Peticiones DELETE
// router.delete('/incidencia', deleteIncidencia);//borrar incidencia 
// router.delete('/alerta', deleteAlerta);//borrar Alerta
// router.delete('/usuario', borrarUsuario);//borra usuario

module.exports = router