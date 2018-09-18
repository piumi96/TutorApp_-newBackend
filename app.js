const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const con = require('./databse/db');
const userRoutes = require('./api/routes/user');

const app = express();

app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json());

con.connect((err) => {
    if(err) throw err;
    else{
        console.log('Database connected');
        //app.use('/user', userRoutes);   
    }

});

app.use('/user', userRoutes);

app.use((req, res, next)=>{
    const error = {
        message: 'Not found',
        status: 404
    };
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});  

module.exports = app;