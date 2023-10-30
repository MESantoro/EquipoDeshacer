const express = require('express');
const conexionamysql = require('../database/bd')
const bodyParser = require('body-parser')
const router = express()
//////////////////////////////
//////////////////////////////
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

module.exports= router;