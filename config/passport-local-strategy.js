const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

//authentication using passport-below tells passport to use localStrategy
//so here passport is using local strategy to find which user has signed in
//created a local strategy from passport
//in local strategy for authentication we are using below lines 
passport.use(new LocalStrategy({
    //passport.use is using the local strategy for authentication
    usernameField:'email',
    //below line allow us to set first argument as req in the callback function
    passReqToCallback:true
},
//callback function inside strategy
function(req,email,password,done){
    //find a user and establish the identity
    User.findOne({email:email},function(err,user){
        if(err){
           // console.log('Error in finding user-->Passport');
           req.flash('error',err)
            return done(err);
        }
        if(!user|| user.password!=password){
            //console.log('Invalid username/Password');
            req.flash('error','Invalid username/password');
            return done(null,false);
        }
        return done(null,user);
    });
}
) 
);

//serializing the user to decide which key is to be kept in the cookies
//serializer will store the user id in the session cookie which is encrypted using express-session library present in the index.js file

passport.serializeUser(function(user,done){
    //only we  want to use user id as a key inside cookie so it is only the key to be encrypted inside the cookie
    //it is being sent from server to the browser
    done(null,user.id);
});

//deserializing the user from the key in the cookies
//it is being sent from browser to the server 
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err ) {
            console.log('Error in finding user-->passport');
            return done(err);
        }
        return done(null,user);
        }
        );
    });

    module.exports=passport;

    //sending data of signed in current user to the views
    //how we can find out if this req is authenticated ,passport put a method on the request called isauthenticated
    //check if user is authenticated
    passport.checkAuthentication=function(req,res,next){
        //we are going to use this function as a middleware since 3 parameter are being passed
        //the below method detected whether the user is signed in  or not
        if(req.isAuthenticated()){
            //if user is signed in ..pass him on the view   page or pass him on to the page
            //it the user is signed in , than pass on the request to the next function(controller's action)
            return next();
        }
        //if user is not signed in
        return res.redirect('/users/sign-in');  
    }

    //once the user is signed in than  set the user for the views or sent the data of signed in user to the views
    passport.setAuthenticatedUser=function(req,res,next){
        if(req.isAuthenticated()){
            //whenever the user is signed in , that user information is available in req.user and this req.user is handled by passport
            //req.user contain the current signed in user from the session cookie and we are just sending this to the locals for the views
            res.locals.user=req.user
        }

        next();
    }