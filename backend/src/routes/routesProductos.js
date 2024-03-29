const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()

// listar tipos de Productos
// metodo GET
//URL /productos
//parametros : ninguno
router.get('/productos', (req , res)=>{
    mysqlConnect.query('SELECT * FROM productos ', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
// traer los  datos del productos por el ID
// metodo GET
//URL /productos/:id_pro
//parametros : ninguno
router.get('/productos/:id_pro', (req , res)=>{
    const { id_pro } = req.params
    mysqlConnect.query('SELECT * FROM productos WHERE id_pro=?', [id_pro], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
// metodo POST
//URL /productos/
//parametros : en el cuerpo(body) 
    // nombre
router.post('/productos', bodyParser.json(), (req , res)=>{
    const { nombre }  = req.body
  
    mysqlConnect.query('INSERT INTO productos (nombre) VALUES (?)', [nombre], (error, registros)=>{
       if(error){
           console.log('Error en la base de datos', error)
       }else{
        res.json({
            status:true,
            mensaje: "El insert se realizo correctamente"
            })
       }
   })
})

// edicion de productos
// metodo PUT
//URL /productos/:id_pro
//parametros : 
    // en el cuerpo(body) 
    // nombre
    // y el parametro que vamos a editar ->id_pro
router.put('/productos/:id_pro', bodyParser.json(), (req , res)=>{
    const { nombre }  = req.body
    const { id_pro } = req.params
    mysqlConnect.query('UPDATE productos SET nombre = ?  WHERE id_pro = ?', [nombre, id_pro], (error, registros)=>{
       if(error){
           console.log('Error en la base de datos', error)
       }else{
         res.json({
            status:true,
            mensaje: "La actualizacion se realizo correctamente"
            })
       }
   })
})

// eliminacion de productos
// metodo DELETE
//URL /productos/:id_pro
//parametros : 
    // y el parametro que vamos a borrar logicamente ->id_pro
router.delete('/productos/:id_pro', bodyParser.json(), (req , res)=>{

    const { actualizar }  = req.body
    const { id_pro } = req.params
    mysqlConnect.query('UPDATE productos SET estado = ?  WHERE id_pro = ?', [actualizar, id_pro], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json({
                status:true,
                mensaje: "El cambio de estado se realizo correctamente"
                })
        }
    })
})

module.exports= router;