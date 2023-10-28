const express = require('express');
const conexionamysql = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()

// listar tipos de productos
router.get('/tipo_producto', (req , res)=>{
    conexionamysql.query('SELECT * FROM tipo_producto', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

// traer tipos de producto por ID
router.get('/tipo_producto/:id_tip', (req , res)=>{
    const {id_tip} = req.params
    conexionamysql.query('SELECT * FROM tipo_producto WHERE id_tip=?', [id_tip], (error, registros)=>{
        if(error){
            console.log('error en a base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

/////// insert de tipo productos
router.post('/tipo_producto', bodyParser.json(), (req , res)=>{
    const { nombre , id_tip } = req.body;

    console.log(req.body);

    conexionamysql.query('INSERT INTO tipo_producto (nombre, id_tip) VALUES (?,?)', [nombre, id_tip], (error, registros)=>{
        if(error){
            console.log('error en la base de datos %s', error.message)
            res.status(500).send('el insert no se realizo');
        }else{
            res.send('el insert se realizo correctamente')
        }
        })
});

/////// edicion de tipo de productos
router.put('/tipo_producto/:id_tip', bodyParser.json(), (req , res)=>{
    const { nombre } = req.body;
    const { id_tip } = req.params;

    console.log(req.body);

    conexionamysql.query('UPDATE tipo_producto SET nombre = ? WHERE id_tip = ?', [nombre, id_tip], (error, registros) => {
        if(error){
            console.log('error en la base de datos %s', error.message)
            res.status(500).send('la edicion no se realizo');
        }else{
            res.status(200).send('la edicion se realizo correctamente')
        }
        })
});

/////// delete de tipo productos
router.delete('/tipo_producto/:id_tip', bodyParser.json(), (req , res) => {
    const { id_tip } = req.params;

    conexionamysql.query('DELETE FROM tipo_producto WHERE id_tip = ?', [id_tip], (error, registros) => {
        if (error) {
            console.log('error en la base de datos %s', error.message);
            res.status(500).send('El registro ' + id_tip + ' no se eliminó correctamente');
        } else {
            res.status(200).send('El registro ' + id_tip + ' se eliminó correctamente');
        }
    });
});

module.exports= router;