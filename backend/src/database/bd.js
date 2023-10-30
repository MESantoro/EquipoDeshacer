const mysql = require('mysql');

const conexionamysql= mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'estadosycuentas' //ANDA
});

conexionamysql.connect(function(err){
    if(err){
        console.log('EL ERROR DE CONEXIÓN ES: ', err)
        return;
    }else{
        console.log('¡¡¡MIRÁ VOS CHE... METANLE FICHA QUE LLEGAN...!!!')
    }
})

module.exports=conexionamysql;
