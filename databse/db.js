const mysql = require('mysql');

module.exports = () => {
    
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Tutor_app'
});

con.connect((err) => {
    if(err) throw err;
    console.log('Databse connected');
});

}