const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generarJwt} = require('../helpers/jwt');

const crearUsuario = async (req, res) => {

    const {email, password} = req.body;

    try {

        let validarUsuario = await Usuario.findOne({email: email});
    
        if(validarUsuario){
            return res.status(400).json({
                ok: false,
                msg: "Un usuario ya existe con ese correo"
            })
        }

        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        //generar jwt
        const token = await generarJwt(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token,
        });

    }catch(err) {
        console.log(err)
        res.status(500).json({ok: false, msg: "Upsss hubo un error hable con el administrador "});
    }
}

const loginUsario = async (req, res) => {

    const {email, password} = req.body;

    try {
        let validarUsuario = await Usuario.findOne({email: email});
    
        if(!validarUsuario){
            return res.status(400).json({
                ok: false,
                msg: "El email no es correcto"
            })
        }

        //confirmar passwords
        const validarPassword = bcrypt.compareSync(password, validarUsuario.password);

        if(!validarPassword){
            return res.status(400).json({
                ok: false,
                msg: "Password incorrecto"
            })
        }

        //generar nuestro jwt
        const token = await generarJwt(validarUsuario.id, validarUsuario.name);

        res.json({
            ok: true,
            uid: validarUsuario.id,
            name: validarUsuario.name,
            token: token,
        });



    }catch(err) {
        console.log(err)
        res.status(500).json({ok: false, msg: "Upsss hubo un error hable con el administrador "});
    }
}

const revalidarToken = async (req, res) => {

    const uid = req.uid;
    const name = req.name;

    //generar un nuevo JWT y retornarlo
    const token = await generarJwt(uid, name);

    res.json({ok: true, uid: uid, name: name, token: token});
}


module.exports = {
    crearUsuario,
    loginUsario,
    revalidarToken,
}