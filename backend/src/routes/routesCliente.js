const express = require('express');
const mysqlConnect = require('../database/bd')
const bodyParser = require('body-parser');
const router = express()
//////////////////////////////
//////////////////////////////
// listar de cliente
// metodo GET
//URL /cliente
//parametros : ninguno
router.get('/cliente', (req , res)=>{
    //mysqlConnect.query("SELECT cc.id_cli, cc.nombre, p.nombre ,concat_ws(' - ', m.nombre, f.nombre), u.nombre lugar_ubicacion, cc.estado    FROM cliente AS e    INNER JOIN productos AS p ON p.id_tip=cc.id_tip  LEFT JOIN productos AS m ON m.id_pro=cc.id_pro LEFT JOIN ubicaciones AS u ON u.id_ubicacion=e.id_ubicacion ", (error, registros)=>{
    mysqlConnect.query('SELECT * FROM cliente', (error, registros)=>{

        if(error){
            console.log('Error en la base de datos', error)
        }else{
            res.json(registros)
        }
    })
})


router.put('/cambiar_estado_cliente/:id_cli', bodyParser.json(), (req , res)=>{
    const { actualizar }  = req.body
    const { id_cli } = req.params
    mysqlConnect.query('UPDATE cliente SET cli_estado = ?  WHERE id_cli = ?', [actualizar, id_cli], (error, registros)=>{
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
// listar de cliente con filtros
// metodo POST
//URL /cliente_filtrado
//parametros : 
    // filtros: id_cli, estado
    router.post('/cliente_filtrado', bodyParser.json(), (req, res) => {
        const { id_cli, cli_estado } = req.body;
        let my_query = "SELECT id_cli, cli_estado FROM cliente WHERE 1 = 1";
    
        if (id_cli) {
            my_query += ` AND id_cli = ${id_cli}`;
        }
        if (cli_estado) {
            my_query += ` AND cli_estado = '${cli_estado}'`;
        }
    
        mysqlConnect.query(my_query, (error, registros) => {
            if (error) {
                console.log('Error en la base de datos', error);
                res.status(500).json({ error: 'Error en la base de datos' });
            } else {
                res.json(registros);
            }
        });
    });
    
////////////////////insert de cliente

// metodo POST
//URL /cliente/
//parametros : en el cuerpo(body) 
    // id_cli, nombre, apellido, direccion, correo, cli_estado, id_cue

router.post('/cliente', bodyParser.json(), (req , res)=>{
    const { id_cli, nombre, apellido, direccion, correo, cli_estado, id_cue }  = req.body
    if(!nombre){
        res.json({
            status:false,
            mensaje: "El Nombre es un campo obligatorio"
        })
    }
    if(!apellido){
        res.json({
            status:false,
            mensaje: "El Apellido es un campo obligatorio"
        })
    }
    if(!correo){
        res.json({
            status:false,
            mensaje: "El Correo es un campo obligatorio"
        })
    }
 /*   if(!id_cli){
        res.json({
            status:false,
            mensaje: "El ID del ciente es un campo obligatorio"
        })
    }*/
    mysqlConnect.query('INSERT INTO cliente (id_cli, nombre, apellido, direccion, correo, cli_estado, id_cue  ) VALUES (?,?,?,?,?,?,?)', [id_cli, nombre, apellido, direccion, correo, cli_estado, id_cue ], (error, registros)=>{
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
//URL /cliente/:id_cli
router.get('/cliente/:id_cli', (req , res)=>{
    
    const { id_cli } = req.params
    console.log('entra aqui', id_cli)
    mysqlConnect.query('SELECT * FROM cliente WHERE id_cli=?', [id_cli], (error, registros)=>{
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
// edicion de cliente metodo UPDATE
//URL /cliente/

    router.put('/cliente/:id_cli', bodyParser.json(), (req , res)=>{
        const { id_cli } = req.params
        const { nombre, apellido, direccion, correo, cli_estado, id_cue } = req.body;
        console.log("esto es el body",req.body)
        if(!nombre){
            res.json({
                status:false,
                mensaje: "El Nombre es un campo obligatorio"
            })
        }
        if(!apellido){
            res.json({
                status:false,
                mensaje: "El Apellido es un campo obligatorio"
            })
        }
        if(!correo){
            res.json({
                status:false,
                mensaje: "El Correo un campo obligatorio"
            })
        }
        if(!id_cue){
            res.json({
                status:false,
                mensaje: "El ID de la cuenta es un campo obligatorio"
            })
        }
        mysqlConnect.query('SELECT * FROM cliente WHERE id_cli=?', [id_cli], (error, registros)=>{
            if(error){
                console.log('Error en la base de datos', error)
            }else{

                if(registros.length>0){
                    mysqlConnect.query('UPDATE cliente SET nombre = ?, apellido = ?, direccion = ?, correo = ?, cli_estado = ?, id_cue = ? WHERE id_cli = ?',
    [nombre, apellido, direccion, correo, cli_estado, id_cli, id_cue], (error, registros) => {
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
//URL /cliente/:id_cli
router.delete('/cliente/:id_cli', bodyParser.json(), (req , res) => {
    const { id_cli } = req.params;

    mysqlConnect.query('DELETE FROM cliente WHERE id_cli = ?', [id_cli], (error, registros) => {
        if (error) {
            console.log('error en la base de datos %s', error.message);
            res.status(500).send('El registro ' + id_cli + ' no se eliminó correctamente');
        } else {
            res.status(200).send('El registro ' + id_cli + ' se eliminó correctamente');
        }
    });
});

module.exports= router;