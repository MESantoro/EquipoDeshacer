const mysql = require('mysql');

const conexionamysql= mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'junin1588',
    database: 'estadosycuentas'
});

conexionamysql.connect(function(err){
    console.log ('conexionamysql');
    if(err){
        console.log('Mi error es ', err)
        return;
    }else{
        console.log('Mi conexion se realizo correctamente')
    }
})

module.exports=conexionamysql;