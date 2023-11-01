const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()

// listar Cuentas Estados
// metodo GET
//URL /cuenta_estado
//parametros : ninguno
router.get('/cuenta_estado', (req , res)=>{
    mysqlConnect.query('SELECT * FROM cuenta_estado ', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
// traer los  datos del cuenta_estado por el ID
// metodo GET
//URL /cuenta_estado/:id_cue
//parametros : ninguno
router.get('/cuenta_estado/:id_cue', (req , res)=>{
    const { id_cue } = req.params
    mysqlConnect.query('SELECT * FROM cuenta_estado WHERE id_cue=?', [id_cue], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
// metodo POST
//URL /cuenta_estado/
//parametros : en el cuerpo(body) 
    // nombre
router.post('/cuenta_estado', bodyParser.json(), (req , res)=>{
    const { nombre }  = req.body
  
    mysqlConnect.query('INSERT INTO cuenta_estado (nombre) VALUES (?)', [nombre], (error, registros)=>{
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

// edicion de cuenta_estado
// metodo PUT
//URL /cuenta_estado/:id_cue
//parametros : 
    // en el cuerpo(body) 
    // nombre
    // y el parametro que vamos a editar ->id_cue
router.put('/cuenta_estado/:id_cue', bodyParser.json(), (req , res)=>{
    const { nombre }  = req.body
    const { id_cue } = req.params
    mysqlConnect.query('UPDATE cuenta_estado SET nombre = ?  WHERE id_cue = ?', [nombre, id_cue], (error, registros)=>{
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

// eliminacion de cuenta_estado
// metodo DELETE
//URL /cuenta_estado/:id_cue
//parametros : 
    // y el parametro que vamos a borrar logicamente ->id_cue
router.delete('/cuenta_estado/:id_cue', bodyParser.json(), (req , res)=>{

    const { actualizar }  = req.body
    const { id_cue } = req.params
    mysqlConnect.query('UPDATE cuenta_estado SET estado = ?  WHERE id_cue = ?', [actualizar, id_cue], (error, registros)=>{
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