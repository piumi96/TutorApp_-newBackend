const express = require('express');
const bcrypt = require('bcrypt');
const con = require('../../databse/db');
const router = express.Router();

router.post('/register', (req, res) => {

    var saltRounds = 10;
    var role = req.body.role;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var pword = req.body.password;
    
    bcrypt.hash(pword, saltRounds, function (err, hash) {
        if (role === 'tutor') {
            var sql = "insert into Tutor(FirstName, LastName, email, pword) values('" + fname + "', '" + lname + "', '" + email + "', '" + hash + "')";

        }
        else if (role === 'student') {
            var sql = "insert into Student(Name, email, pword) values('" + fname + " " + lname + "', '" + email + "', '" + hash + "')";
        }

        var sql2 = "select * from tutor, student where tutor.email='" + email + "' or student.email='" + email + "'";
        con.query(sql2, function (err, result) {
            if (err) throw err;
            else{
            if (result.length > 0) {
                res.json({
                    has: true
                });
            }
            else {
                con.query(sql, function (err, result) {
                    console.log(result);
                    if (err) {
                        res.json({
                            success: false
                        });
                    }
                    else {
                        res.json({
                            success: true
                        });
                    }
                });
            }}
        });
    });
});

module.exports = router;