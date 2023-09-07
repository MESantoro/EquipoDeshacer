const express = require("express");
const morgan = require("morgan");

//Inicializaciones
const app = express();

//Setings (Puerta de Conexion)
app.set('port', process.env.PORT || 4000);

//Midalewares (Funciones o Peticiones)
app.use(morgan('dev'));

//Global Variables (Variables Globales)

//Rutas
app.use(require('./routes'));

//Public

//Inicio del Servidor
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})