const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()

// listar Tipo_Productos
// metodo GET
//URL /tipo_producto
//parametros : ninguno
router.get('/tipo_producto', (req , res)=>{
    mysqlConnect.query('SELECT * FROM tipo_producto ', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
// traer los  datos del tipo_producto por el ID
// metodo GET
//URL /tipo_producto/:id_tip
//parametros : ninguno
router.get('/tipo_producto/:id_tip', (req , res)=>{
    const { id_tip } = req.params
    mysqlConnect.query('SELECT * FROM tipo_producto WHERE id_tip=?', [id_tip], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
// metodo POST
//URL /tipo_producto/
//parametros : en el cuerpo(body) 
    // nombre
router.post('/tipo_producto', bodyParser.json(), (req , res)=>{
    const { nombre }  = req.body
  
    mysqlConnect.query('INSERT INTO tipo_producto (nombre) VALUES (?)', [nombre], (error, registros)=>{
       if(error){
           console.log('Error en la base de datos', error)
       }else{
        res.json({
            status:true,
            mensaje: "Se agrego el registro correctamente"
            })
       }
   })
})

// edicion de tipo_producto
// metodo PUT
//URL /tipo_producto/:id_tip
//parametros : 
    // en el cuerpo(body) 
    // nombre
    // y el parametro que vamos a editar ->id_tip
router.put('/tipo_producto/:id_tip', bodyParser.json(), (req , res)=>{
    const { nombre }  = req.body
    const { id_tip } = req.params
    mysqlConnect.query('UPDATE tipo_producto SET nombre = ?  WHERE id_tip = ?', [nombre, id_tip], (error, registros)=>{
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

// eliminacion de tipo_producto
// metodo DELETE
//URL /tipo_producto/:id_tip
//parametros : 
    // y el parametro que vamos a borrar logicamente ->id_tip
router.delete('/tipo_producto/:id_tip', bodyParser.json(), (req , res)=>{

    const { actualizar }  = req.body
    const { id_tip } = req.params
    mysqlConnect.query('UPDATE tipo_producto SET estado = ?  WHERE id_tip = ?', [actualizar, id_tip], (error, registros)=>{
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