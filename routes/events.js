/*
EVENTS ROUTES /todos/
*/


const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');
const {getTodos, crearTodo, actualizarTodo, eliminarTodo} = require('../controllers/events')
//obtener los todos del usuario 
//crear los todos del usuario 
//actualizar los todos del usuario
//eliminar los todos del usuario 

//Todas las peticiones deben de pasar por validarTokens
router.use(validarJWT);

router.get("/:userId", getTodos);

router.post(
    "/:useId", 
    [
        check("task", "La tarea es obligatoria").not().isEmpty(),
        validarCampos
    ], 
    crearTodo);

router.put("/:userId/:todoId", actualizarTodo);

router.delete("/:userId/:todoId", eliminarTodo);

module.exports = router;