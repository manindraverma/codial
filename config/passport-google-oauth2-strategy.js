const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env=require('./environment')

//below we tell passport to use google strategy or tell passport to use new strategy for google login
passport.use(new googleStrategy({
    // clientID: '370216043982-8mctp6s59k53ao8ud8nqp6pv8n0kuujf.apps.googleusercontent.com',
    // clientSecret: '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',
    // callbackURL: 'http://localhost:8000/users/auth/google/callback'

    //now we are using below lines instead of above 3 commented lines bcoz of using development environment
    clientID:env.google_client_ID,
    clientSecret:env.google_client_Secret,
    callbackURL:env.google_call_back_URL,


},
    //callback function is being called
    function (accessToken, refreshToken, profile, done) {
            //find the user
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log('error in google strategy-passport', err);
                return;
            }
            console.log(profile);
            //if user is found than set this user as req.user
            if (user) {
                return done(null, user);
            }
            else {
                //if user is not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) {
                        console.log('error in creating google strategy-passport', err);
                        return;
                    }
                    return done(null, user);
                })
            }
        })
    }

))

module.exports=passport;