const mysql = require ('mysql');

const connection = mysql.createConnection({
host: 'https://databases.000webhost.com/',
user: 'id21144240_kbj_api',
password:'Karla099#',
database:'id21144240_kbj_api',
family: 'IPv4'
});
connection.connect((err)=>{
    if (err){
        console.error('error de conexion a la base de datos:',err);
        return;
    }
    console.log('conexion a la base de datos exitosa');

});

module.exports = connection;
