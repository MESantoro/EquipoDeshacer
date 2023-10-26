const express = require('express');
const conexionamysql = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()

// listar Formas de pago
router.get('/forma_pago', (req , res)=>{
    conexionamysql.query('SELECT * FROM forma_pago', (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})

// traer los  datos del modelo por ID
router.get('/forma_pago/:id_pag', (req , res)=>{
    const { id_pag } = req.params
    conexionamysql.query('SELECT * FROM forma_pago WHERE id_pag=?', [id_pag], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
////////////////////insert de forma de pago

router.post('/forma_pago', bodyParser.json(), (req , res)=>{
     const { forma,  }  = req.body
    
     conexionamysql.query('INSERT INTO forma_pago (forma, ) VALUES (?, ?)', [forma, ], (error, registros)=>{
        if(error){
            res.json({
                status:false,
                mensaje: error
                })
        }else{
            res.json({
                status:true,
                mensaje: "El insert se realizo correctamente"
                })
        }
    })
})
// /////////////////////////////

////////////////////edicion de modulo
router.put('/forma_pago/:id_pag', bodyParser.json(), (req , res)=>{
    const { forma,  }  = req.body
    const { id_pag } = req.params
    conexionamysql.query('UPDATE forma_pago SET forma = ?,  = ? WHERE id_pag = ?', [forma, , id_pag], (error, registros)=>{
       if(error){
           console.log('Error en la base de datos', error)
       }else{
           res.send('La edicion de registro ' +id_pag+ ' se realizo correctamente')
       }
   })
})
// /////////////////////////////
////////////////////eliminar forma de pago
router.delete('/forma_pago/:id_pag', bodyParser.json(), (req , res)=>{
    const { id_pag } = req.params
    conexionamysql.query('DELETE FROM forma_pago WHERE id_pag = ?', [id_pag], (error, registros)=>{
       if(error){
           
            res.json({
            status:false,
            mensaje: error
        })
       }else{
         res.json({
            status:true,
            mensaje: 'La eliminacion del registro ' +id_pag+ ' se realizo correctamente'
        })
          
       }
   })
})
//////////////////////////////
module.exports= router;