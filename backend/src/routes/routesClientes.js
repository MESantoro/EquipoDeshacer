const express = require('express');
const conexionamysql = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()
//////////////////////////////
//////////////////////////////
// listar de clientes
// metodo GET
//URL /clientes
//parametros : ninguno
router.get('/clientes', (req , res)=>{
    //conexionamysql.query("SELECT e.id_cli, e.nombre,te.nombre ,concat_ws(' - ', m.nombre, f.nombre), u.nombre lugar_ubicacion, e.estado    FROM clientes AS e    INNER JOIN tipos_equipo AS te ON te.id_tip=e.id_tip  LEFT JOIN productos AS m ON m.id_pro=e.id_pro LEFT JOIN ubicaciones AS u ON u.id_ubicacion=e.id_ubicacion ", (error, registros)=>{
    conexionamysql.query('SELECT * FROM clientes', (error, registros)=>{

        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})


router.put('/cambiar_estado_clientes/:id_cli', bodyParser.json(), (req , res)=>{
    const { actualizar }  = req.body
    const { id_cli } = req.params
    conexionamysql.query('UPDATE clientes SET cli_estado = ?  WHERE id_cli = ?', [actualizar, id_cli], (error, registros)=>{
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
// listar de clientes con filtros
// metodo POST
//URL /clientes_filtrado
//parametros : 
    // filtros: id_cli, estado
    router.post('/clientes_filtrado', bodyParser.json(), (req, res) => {
        const { id_cli, cli_estado } = req.body;
        let my_query = "SELECT id_cli, cli_estado FROM clientes WHERE 1 = 1";
    
        if (id_cli) {
            my_query += ` AND id_cli = ${id_cli}`;
        }
        if (cli_estado) {
            my_query += ` AND cli_estado = '${cli_estado}'`;
        }
    
        conexionamysql.query(my_query, (error, registros) => {
            if (error) {
                console.log('Error en la base de datos', error);
                res.status(500).json({ error: 'Error en la base de datos' });
            } else {
                res.json(registros);
            }
        });
    });
    
////////////////////insert de clientes

// metodo POST
//URL /clientes/
//parametros : en el cuerpo(body) 
    // id_cli, nombre, apellido, direccion, correo, cli_estado, id_cue

router.post('/clientes', bodyParser.json(), (req , res)=>{
    const { id_cli, nombre, apellido, direccion, correo, cli_estado, id_cue }  = req.body
    if(!nombre){
        res.json({
            status:false,
            mensaje: "El nombre es un campo obligatorio"
        })
    }
    if(!apellido){
        res.json({
            status:false,
            mensaje: "El apellido es un campo obligatorio"
        })
    }
    if(!correo){
        res.json({
            status:false,
            mensaje: "El correo es un campo obligatorio"
        })
    }
 /*   if(!id_cli){
        res.json({
            status:false,
            mensaje: "El ID del ciente es un campo obligatorio"
        })
    }*/
    conexionamysql.query('INSERT INTO clientes (id_cli, nombre, apellido, direccion, correo, cli_estado, id_cue  ) VALUES (?,?,?,?,?,?,?)', [id_cli, nombre, apellido, direccion, correo, cli_estado, id_cue ], (error, registros)=>{
        if(error){
            console.log('Error en la base de datos', error)
        }else{
        res.json({
            status:true,
            mensaje: "El registro se grabo correctamente"
        })
        }
    })
})
// traer los  datos del cliente por el ID

// metodo GET
//URL /clientes/:id_cli
router.get('/clientes/:id_cli', (req , res)=>{
    
    const { id_cli } = req.params
    console.log('entra aqui', id_cli)
    conexionamysql.query('SELECT * FROM clientes WHERE id_cli=?', [id_cli], (error, registros)=>{
        if(error){
            res.json({
                status:false
            })
        }else{
            if(registros.length>0){
                res.json(registros)
            }else{
                res.json({
                    status:false,
                    mensaje:"El ID del cliente no existe" 
                });
            }
            
        }
    })
})
// edicion de clientes metodo UPDATE
//URL /clientes/

    router.put('/clientes/:id_cli', bodyParser.json(), (req , res)=>{
        const { id_cli } = req.params
        const { nombre, apellido, direccion, correo, cli_estado, id_cue } = req.body;
        console.log("esto es el body",req.body)
        if(!nombre){
            res.json({
                status:false,
                mensaje: "El nombre es un campo obligatorio"
            })
        }
        if(!apellido){
            res.json({
                status:false,
                mensaje: "El apellido es un campo obligatorio"
            })
        }
        if(!correo){
            res.json({
                status:false,
                mensaje: "El correo un campo obligatorio"
            })
        }
        if(!id_cue){
            res.json({
                status:false,
                mensaje: "El ID de la cuenta es un campo obligatorio"
            })
        }
        conexionamysql.query('SELECT * FROM clientes WHERE id_cli=?', [id_cli], (error, registros)=>{
            if(error){
                console.log('Error en la base de datos', error)
            }else{

                if(registros.length>0){
                    conexionamysql.query('UPDATE clientes SET nombre = ?, apellido = ?, direccion = ?, correo = ?, cli_estado = ?, id_cue = ? WHERE id_cli = ?',
    [nombre, apellido, direccion, correo, cli_estado, id_cue, id_cli], (error, registros) => {
        if(error){
            console.log('error en la base de datos %s', error.message)
            res.status(500).send('la edicion no se realizo');
                        }else{
                            res.json({
                                status:true,
                                mensaje:"El registro " +id_cli+ " se edito correctamente" 
                            })
                        }
                    })
                }else{
                    res.json({
                        status:false,
                        mensaje:"El ID del cliente no existe" 
                    })
                }
                
            }
        })  
    })
// metodo DELETE
//URL /clientes/:id_cli
router.delete('/clientes/:id_cli', bodyParser.json(), (req , res) => {
    const { id_cli } = req.params;

    conexionamysql.query('DELETE FROM clientes WHERE id_cli = ?', [id_cli], (error, registros) => {
        if (error) {
            console.log('error en la base de datos %s', error.message);
            res.status(500).send('El registro ' + id_cli + ' no se eliminó correctamente');
        } else {
            res.status(200).send('El registro ' + id_cli + ' se eliminó correctamente');
        }
    });
});

module.exports= router;