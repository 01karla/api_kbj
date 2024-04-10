const mysql = require ('mysql');

const connection = mysql.createConnection({
host: 'https://mx148.hostgator.mx/',
user: 'uniutvts_kbj_bd',
password:'KarlaGarcia#',
database:'uniutvts_kbj'
});
connection.connect((err)=>{
    if (err){
        console.error('error de conexion a la base de datos:',err);
        return;
    }
    console.log('conexion a la base de datos exitosa');

});

module.exports = connection;
