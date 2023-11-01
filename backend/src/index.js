// Uso de las dependencias instaladas
const express = require('express'); //ANDA
const morgan = require('morgan'); //ANDA
const path = require('path');

// Inicializaciones
const app = express(); // ANDA

// Setings (Puerta de Conexion o enganche de la base y puerto disponible) ANDA
app.set('puerto', process.env.puerto || 3000);


//Midalewares (Funciones o Peticiones)
app.use(morgan('dev')); //ANDA
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Global Variables (Variables Globales)
app.use((req, res, next) =>{ // ANDA

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Rutas ANDA
app.use(require('./routes/routes'))
app.use(require('./routes/routesProductos'))
app.use(require('./routes/routesTipo_Producto'))
app.use(require('./routes/routesForma_Pago'))
app.use(require('./routes/routesCuenta_Estado'))
app.use(require('./routes/routesCliente'))
app.use(require('./routes/routesUsuarios')) 
app.use(require('./routes/routesUbicaciones'))
app.use(require('./routes/routesRoles'))


// Public
app.use(express.static(path.join(__dirname, 'public')));


// Inicio del Servidor ANDA
app.listen(app.get('puerto'), () => {
    console.log('EL SERVIDOR ESTÁ ABIERTO EN EL:', app.get('puerto'));
});