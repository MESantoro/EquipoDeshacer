const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()

// listar tipos de equipo
// metodo GET
//URL /roles
//parametros : ninguno
router.get('/roles', (req , res)=>{
    mysqlConnect.query('SELECT * FROM roles ', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
// traer los  datos del roles por el ID
// metodo GET
//URL /roles/:id_rol
//parametros : ninguno
router.get('/roles/:id_rol', (req , res)=>{
    const { id_rol } = req.params
    mysqlConnect.query('SELECT * FROM roles WHERE id_rol=?', [id_rol], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
// metodo POST
//URL /roles/
//parametros : en el cuerpo(body) 
    // nombre
router.post('/roles', bodyParser.json(), (req , res)=>{
    const { nombre }  = req.body
  
    mysqlConnect.query('INSERT INTO roles (nombre) VALUES (?)', [nombre], (error, registros)=>{
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

// edicion de roles
// metodo PUT
//URL /roles/:id_rol
//parametros : 
    // en el cuerpo(body) 
    // nombre
    // y el parametro que vamos a editar ->id_rol
router.put('/roles/:id_rol', bodyParser.json(), (req , res)=>{
    const { nombre }  = req.body
    const { id_rol } = req.params
    mysqlConnect.query('UPDATE roles SET nombre = ?  WHERE id_rol = ?', [nombre, id_rol], (error, registros)=>{
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

// eliminacion de roles
// metodo DELETE
//URL /roles/:id_rol
//parametros : 
    // y el parametro que vamos a borrar logicamente ->id_rol
router.delete('/roles/:id_rol', bodyParser.json(), (req , res)=>{

    const { actualizar }  = req.body
    const { id_rol } = req.params
    mysqlConnect.query('UPDATE roles SET estado = ?  WHERE id_rol = ?', [actualizar, id_rol], (error, registros)=>{
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