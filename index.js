const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./database/config');

//crear el servidor en express
const app = express();

//conexion a la base de datos
dbConnection();

//lectura y parse del body
app.use(express.json());
//habilitar cors
app.use(cors());

//rutas
//auth //crear, login, renew
//evetos: //crear/actualizar/eliminar
app.use("/api/auth", require("./routes/auth"));

app.use("/todos", require("./routes/events"));

//directorio publico
app.use(express.static("public"));

//escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto", process.env.PORT);
});