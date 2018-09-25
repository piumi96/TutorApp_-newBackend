const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const con = require('../databse/db');

passport.use(
    new GoogleStrategy({
        //options for google strategy
        callbackURL: '/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, emails, done) => {
        //passport callback function
        //console.log(emails);
        user = {
            fname: emails.name.givenName,
            lname: emails.name.familyName,
            email: emails.emails[0].value
        };
        console.log(user);
        var sql = "insert into Tutor(FirstName, LastName, email) values('" + user.fname + "', '" + user.lname + "', '" + user.email + "')"

        con.query(sql, (err, result) => {
            if(err) throw err;
            else{
                console.log("user registered");
            }
        }); 
        //module.exports = user;

    })
)


 