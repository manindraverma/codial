const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
//below extract jwt from the header
const ExtractJWT=require('passport-jwt').ExtractJwt;
const env=require('./environment');

const User=require('../models/user');
//while defining jwt we need to have some options like encryption

let  opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    // secretOrKey :'codeial'
    //below lines are used for the above commented lines since we are using development environment
    secretOrKey: env.jwt_secret
}

//tells passport to use JWTStrategy 
//in below line the callback func reads the data from the jwt payload
passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    //find the user based on the information from jwtPayload
    User.findById(jwtPayload._id,function(err,user){
        if(err){console.log("Error in finding the user from the JWT ",err); return;}
        if(user){
            return done(null,user);
        }else{
            //here false represent that the user was not found
            return done(null,false);
        }
    })


}));

module.exports=passport;
