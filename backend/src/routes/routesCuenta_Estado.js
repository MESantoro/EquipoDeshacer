const express = require('express');
const conexionamysql = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()
const jwt = require('jsonwebtoken')

// listar Estado de Cuenta
// metodo GET
//URL /cuenta_estado

router.get('/cuenta_estado', verificarToken,(req , res)=>{
    jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            conexionamysql.query('SELECT * FROM cuenta_estado', (error, registros)=>{
                if(error){
                    console.log('Error en la base de datos', error)
                }else{
                    res.json(registros)
                }
            })
        }
    })
});
// traer estados de cuenta por el ID

// metodo GET
//URL /cuenta_estado/:id_cue

router.get('/cuenta_estado/:id_cue', (req , res)=>{
    const { id_cue } = req.params
    conexionamysql.query('SELECT * FROM cuenta_estado WHERE id_cue=?', [id_cue], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})
////////////////////insert de Estado de cuenta

// metodo POST
//URL /cuenta_estado/
//parametros : en el cuerpo(body) 
    // estado

router.post('/cuenta_estado', bodyParser.json(), (req , res)=>{
    const { estado }  = req.body
  
    conexionamysql.query('INSERT INTO cuenta_estado (estado) VALUES (?)', [estado], (error, registros)=>{
       if(error){
           console.log('Error en la base de datos', error)
       }else{
            res.json({
            status:true,
            mensaje: "El agregado se realizo correctamente"
            })
       }
   })
})


////////////////////edicion de Estado de Cuenta
// metodo PUT
//URL /cuenta_estado/:id_cue
//parametros : 
    // en el cuerpo(body) 
    // estado
    // y el parametro que vamos a editar ->id_cue
router.put('/cuenta_estado/:id_cue', bodyParser.json(), (req , res)=>{
    const { estado }  = req.body
    const { id_cue } = req.params
    conexionamysql.query('UPDATE cuenta_estado SET estado = ?  WHERE id_cue = ?', [estado, id_cue], (error, registros)=>{
       if(error){
           console.log('Error en la base de datos', error)
       }else{
        res.json({
            status:true,
            mensaje: "La edicion de registro se realizo correctamente"
            })
       }
   })
})

///////////////////eliminacion de estado de cuenta

router.delete('/cuenta_estado/:id_cue', bodyParser.json(), (req , res)=>{
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

function verificarToken(req, res, next){
    const bearer= req.headers['authorization'];
    if(typeof bearer!=='undefined'){
        const token =bearer.split(" ")[1]
        req.token= token;
        next()
    }else{
        res.send('Debe contener un token')
    }
 }

//////////////////////////////
module.exports= router;