const mysql = require('mysql');

const {database} = require('.keys');

const pool = mysql.createPool(database);

pool.getConnection(err, conection) => {
    if (err.code === 'PROTOCOL_CONNECTION')
}