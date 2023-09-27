// Uso de las dependencias instaladas
const express = require('express'); //ANDA
const morgan = require('morgan'); //ANDA
const exphbs = require('express-handlebars');
const path = require('path');

// Inicializaciones
const app = express(); // ANDA

// Setings (Puerta de Conexion o enganche de la base y puerto disponible)
app.set('puerto', process.env.puerto || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

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

//Rutas
//app.use(require('./routes'));
//app.use(require('./routes/authentication'));
//app.use('/links', require('./routes/links'));

app.use(require('./routes/routesMieres'))
/* app.use(require('./routes/routes'))
app.use(require('./routes/routesProductos'))
app.use(require('./routes/routesTiposProd'))
app.use(require('./routes/routesFormasPago'))
app.use(require('./routes/routesCuentaEstado'))
app.use(require('./routes/routesClientes'))
app.use(require('./routes/routesUsuarios')) */

// Public
app.use(express.static(path.join(__dirname, 'public')));


// Inicio del Servidor ANDA
app.listen(app.get('puerto'), () => {
    console.log('EL SERVIDOR ESTÁ ABIERTO EN EL:', app.get('puerto'));
});