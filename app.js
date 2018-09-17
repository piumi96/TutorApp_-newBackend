const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const db = require('./databse/db.js')();

const app = express();

app.use((req, res) => {
    require('./databse/db.js');
    console.log("database connected");
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        msg: error.message
    });
});


module.exports = app;