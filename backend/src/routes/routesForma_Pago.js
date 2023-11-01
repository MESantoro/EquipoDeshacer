const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()

// listar tipos de Forma_Pago
// metodo GET
//URL /forma_pago
//parametros : ninguno
router.get('/forma_pago', (req , res)=>{
    mysqlConnect.query('SELECT * FROM forma_pago ', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
// traer los  datos del forma_pago por el ID
// metodo GET
//URL /forma_pago/:id_pag
//parametros : ninguno
router.get('/forma_pago/:id_pag', (req , res)=>{
    const { id_pag } = req.params
    mysqlConnect.query('SELECT * FROM forma_pago WHERE id_pag=?', [id_pag], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
// metodo POST
//URL /forma_pago/
//parametros : en el cuerpo(body) 
    // nombre
router.post('/forma_pago', bodyParser.json(), (req , res)=>{
    const { nombre }  = req.body
  
    mysqlConnect.query('INSERT INTO forma_pago (nombre) VALUES (?)', [nombre], (error, registros)=>{
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

// edicion de forma_pago
// metodo PUT
//URL /forma_pago/:id_pag
//parametros : 
    // en el cuerpo(body) 
    // nombre
    // y el parametro que vamos a editar ->id_pag
router.put('/forma_pago/:id_pag', bodyParser.json(), (req , res)=>{
    const { nombre }  = req.body
    const { id_pag } = req.params
    mysqlConnect.query('UPDATE forma_pago SET nombre = ?  WHERE id_pag = ?', [nombre, id_pag], (error, registros)=>{
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

// eliminacion de forma_pago
// metodo DELETE
//URL /forma_pago/:id_pag
//parametros : 
    // y el parametro que vamos a borrar logicamente ->id_pag
router.delete('/forma_pago/:id_pag', bodyParser.json(), (req , res)=>{

    const { actualizar }  = req.body
    const { id_pag } = req.params
    mysqlConnect.query('UPDATE forma_pago SET estado = ?  WHERE id_pag = ?', [actualizar, id_pag], (error, registros)=>{
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