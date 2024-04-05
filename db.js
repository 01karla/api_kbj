const mysql = require ('mysql');

const connection = mysql.createConnection({
host:'localhost',
user: 'root',
password:'',
database:'kbj'
});
connection.connect((err)=>{
    if (err){
        console.error('error de conexion a la base de datos:',err);
        return;
    }
    console.log('conexion a la base de datos exitosa');

});

module.exports = connection;
