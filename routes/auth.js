/*
    rutas de usuarios auth
    host + /api/auth/
 */

const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const {crearUsuario, loginUsario, revalidarToken} = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar-jwt');

router.post("/register", 
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe de ser minimo de 6 caracteres").isLength({min:6}),
        validarCampos

    ] 
    ,crearUsuario);

router.post("/login", 
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe de ser minimo de 6 caracteres").isLength({min:6}),
        validarCampos
    ],
    loginUsario);

router.get("/renew", validarJWT,  revalidarToken);



module.exports = router;