
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const con = require('../databse/db');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {

    done(null, user);
});

passport.use(
    new GoogleStrategy({
        //options for google strategy
        callbackURL: '/search',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, email, done) => {
        //passport callback function
        //console.log(email);
        
        user = {
            fname: email.name.givenName,
            lname: email.name.familyName,
            email: email.emails[0].value 
        };
            
        module.exports = user;
        /* console.log(user);
        var sql = "insert into Tutor(FirstName, LastName, email) values('" + user.fname + "', '" + user.lname + "', '" + user.email + "')"

        con.query(sql, (err, result) => {
            if(err) throw err;
            else{
                console.log("user registered"); */
                done(null, user);
            /* }
        });   */
        
        
        //console.log(token);

    })
)


 