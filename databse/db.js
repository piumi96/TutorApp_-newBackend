const mysql = require('mysql');

module.exports = (app) => {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'Tutor_app'
    });

    con.connect((err) => {
        if(err) throw err;
        else{
            console.log('Database connected');
            //app.use('/user', userRoutes);   
        }

    });
}