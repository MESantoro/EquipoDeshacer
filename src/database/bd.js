const mysql = require('mysql');

const mysqlConeccion= mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'estadosycuentas' //HAY Q PONER BD CUENTAS
});

mysqlConeccion.connect(function(err){
    if(err){
        console.log('EL ERROR DE CONEXIÓN ES: ', err)
        return;
    }else{
        console.log('MIRÁ... ANDA LA COSA ÉSTA...')
    }
})

module.exports=mysqlConeccion;

/* const mysql = require('mysql'); //ANDA

const {bd} = require('.keys'); //ANDA

const pool = mysql.createPool(bd);

pool.getConnection(err, conection) => {
    if (err.code === 'PROTOCOL_CONNECTION');
}; */