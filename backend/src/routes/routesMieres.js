const express = require('express');

const conexionamysql = require('../database/bd')
const bodyParser = require('body-parser');

const router = express()


router.get('/', (req , res)=>{
    res.send('Hola chimi 2')
})


// listar cliente
router.get('/cliente', (req , res)=>{
    conexionamysql.query('SELECT * FROM cliente', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

// traer datos de cliente por ID

router.get('/cliente/:id_cli', (req , res)=> {
    const { id_cli } = req.params;
    conexionamysql.query('SELECT * FROM cliente WHERE id_cli=?', [id_cli], (error, registros)=>{
        if(error){
            console.log('error en a base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

/////// insert de cliente


router.post('/cliente', bodyParser.json(), (req , res)=>{
    const { nombre , apellido, direccion, correo, cli_estado, id_cue } = req.body;

    console.log(req.body);

    conexionamysql.query('INSERT INTO cliente (nombre, apellido, direccion, correo, cli_estado, id_cue) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellido, direccion, correo, cli_estado, id_cue], (error, registros)=>{
        if(error){
            console.log('error en la base de datos %s', error.message)
            res.status(500).send('el insert no se realizo');
        }else{
            res.send('el insert se realizo correctamente')
        }
        })
});

/////// edicion de cliente

router.put('/cliente/:id_cli', bodyParser.json(), (req , res) => {
    const { id_cli } = req.params;
    const { nombre, apellido, direccion, correo, cli_estado, id_cue } = req.body;

    console.log(req.body);


    conexionamysql.query('UPDATE cliente SET nombre = ?, apellido = ?, direccion = ?, correo = ?, cli_estado = ?, id_cue = ? WHERE id_cli = ?',
    [nombre, apellido, direccion, correo, cli_estado, id_cue, id_cli], (error, registros) => {
        if(error){
            console.log('error en la base de datos %s', error.message)
            res.status(500).send('la edicion no se realizo');
        }else{
            res.status(200).send('la edicion se realizo correctamente')
        }
        })
});

/////// delete de cliente
router.delete('/cliente/:id_cli', bodyParser.json(), (req , res) => {
    const { id_cli } = req.params;

    conexionamysql.query('DELETE FROM cliente WHERE id_cli = ?', [id_cli], (error, registros) => {
        if (error) {
            console.log('error en la base de datos %s', error.message);
            res.status(500).send('El registro ' + id_cli + ' no se eliminó correctamente');
        } else {
            res.status(200).send('El registro ' + id_cli + ' se eliminó correctamente');
        }
    });
});


// listar productos
router.get('/productos', (req , res)=>{
    conexionamysql.query('SELECT * FROM productos', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

// traer datos de producto por ID
router.get('/productos/:id_pro', (req , res)=>{
    const {id_pro} = req.params
    conexionamysql.query('SELECT * FROM productos WHERE id_pro=?', [id_pro], (error, registros)=>{
        if(error){
            console.log('error en a base de datos', error)
        }else{
            res.json(registros)
        }
    })
})


/////// insert de productos
router.post('/productos', bodyParser.json(), (req , res)=>{
    const { nombre , id_pro } = req.body;

    console.log(req.body);

    conexionamysql.query('INSERT INTO productos (nombre, id_pro) VALUES (?,?)', [nombre, id_pro], (error, registros)=>{
        if(error){
            console.log('error en la base de datos %s', error.message)
            res.status(500).send('el insert no se realizo');
        }else{
            res.send('el insert se realizo correctamente')
        }
        })
});

/////// edicion de productos
router.put('/productos/:id_pro', bodyParser.json(), (req , res)=>{
    const { nombre } = req.body;
    const { id_pro } = req.params;

    console.log(req.body);

    conexionamysql.query('UPDATE productos SET nombre = ? WHERE id_pro = ?', [nombre, id_pro], (error, registros) => {
        if(error){
            console.log('error en la base de datos %s', error.message)
            res.status(500).send('la edicion no se realizo');
        }else{
            res.status(200).send('la edicion se realizo correctamente')
        }
        })
});

/////// delete de productos
router.delete('/productos/:id_pro', bodyParser.json(), (req , res) => {
    const { id_pro } = req.params;

    conexionamysql.query('DELETE FROM productos WHERE id_pro = ?', [id_pro], (error, registros) => {
        if (error) {
            console.log('error en la base de datos %s', error.message);
            res.status(500).send('El registro ' + id_pro + ' no se eliminó correctamente');
        } else {
            res.status(200).send('El registro ' + id_pro + ' se eliminó correctamente');
        }
    });
});

// listar tipos de productos
router.get('/tipo_productos', (req , res)=>{
    conexionamysql.query('SELECT * FROM tipo_productos', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

// traer tipos de producto por ID
router.get('/tipo_productos/:id_tip', (req , res)=>{
    const {id_tip} = req.params
    conexionamysql.query('SELECT * FROM tipo_productos WHERE id_tip=?', [id_tip], (error, registros)=>{
        if(error){
            console.log('error en a base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

/////// insert de tipo productos
router.post('/tipo_productos', bodyParser.json(), (req , res)=>{
    const { nombre , id_tip } = req.body;

    console.log(req.body);

    conexionamysql.query('INSERT INTO tipo_productos (nombre, id_tip) VALUES (?,?)', [nombre, id_tip], (error, registros)=>{
        if(error){
            console.log('error en la base de datos %s', error.message)
            res.status(500).send('el insert no se realizo');
        }else{
            res.send('el insert se realizo correctamente')
        }
        })
});

/////// edicion de tipo de productos
router.put('/tipo_productos/:id_tip', bodyParser.json(), (req , res)=>{
    const { nombre } = req.body;
    const { id_tip } = req.params;

    console.log(req.body);

    conexionamysql.query('UPDATE tipo_productos SET nombre = ? WHERE id_tip = ?', [nombre, id_tip], (error, registros) => {
        if(error){
            console.log('error en la base de datos %s', error.message)
            res.status(500).send('la edicion no se realizo');
        }else{
            res.status(200).send('la edicion se realizo correctamente')
        }
        })
});

/////// delete de tipo productos
router.delete('/tipo_productos/:id_tip', bodyParser.json(), (req , res) => {
    const { id_tip } = req.params;

    conexionamysql.query('DELETE FROM tipo_productos WHERE id_tip = ?', [id_tip], (error, registros) => {
        if (error) {
            console.log('error en la base de datos %s', error.message);
            res.status(500).send('El registro ' + id_tip + ' no se eliminó correctamente');
        } else {
            res.status(200).send('El registro ' + id_tip + ' se eliminó correctamente');
        }
    });
});

// listar estado de las cuentas
router.get('/cuenta_estado', (req , res)=>{
    conexionamysql.query('SELECT * FROM cuenta_estado', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

// traer estado de cuentas por ID
router.get('/cuenta_estado/:id_cue', (req , res)=>{
    const {id_cue} = req.params
    conexionamysql.query('SELECT * FROM cuenta_estado WHERE id_cue=?', [id_cue], (error, registros)=>{
        if(error){
            console.log('error en a base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

/////// insert de estado de cuentas
router.post('/cuenta_estado', bodyParser.json(), (req , res)=>{
    const { estado , id_cue } = req.body;

    console.log(req.body);

    conexionamysql.query('INSERT INTO cuenta_estado (estado, id_cue) VALUES (?,?)', [estado, id_cue], (error, registros)=>{
        if(error){
            console.log('error en la base de datos %s', error.message)
            res.status(500).send('el insert no se realizo');
        }else{
            res.send('el insert se realizo correctamente')
        }
        })
});

/////// edicion de estado de cuentas
router.put('/cuenta_estado/:id_cue', bodyParser.json(), (req , res)=>{
    const { estado } = req.body;
    const { id_cue } = req.params;

    console.log(req.body);

    conexionamysql.query('UPDATE cuenta_estado SET estado = ? WHERE id_cue = ?', [estado, id_cue], (error, registros) => {
        if(error){
            console.log('error en la base de datos %s', error.message)
            res.status(500).send('la edicion no se realizo');
        }else{
            res.status(200).send('la edicion se realizo correctamente')
        }
        })
});

/////// delete de estado de cuentas
router.delete('/cuenta_estado/:id_cue', bodyParser.json(), (req , res) => {
    const { id_cue } = req.params;

    conexionamysql.query('DELETE FROM cuenta_estado WHERE id_cue = ?', [id_cue], (error, registros) => {
        if (error) {
            console.log('error en la base de datos %s', error.message);
            res.status(500).send('El registro ' + id_cue + ' no se eliminó correctamente');
        } else {
            res.status(200).send('El registro ' + id_cue + ' se eliminó correctamente');
        }
    });
});

module.exports= router;
