const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const db= require('./config/mongoose');
//below library is used to automatically encrypt the session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
//below library is used to store the session cookie in db  so that even after the server restart ,session do not get deleted
//unlike other library this library require argument which is going to stored
const MongoStore=require('connect-mongo')(session);

//when we use layouts library
const expressLayouts= require('express-ejs-layouts')



//reading through the post request
app.use(express.urlencoded());

//setting up the cookieParser
app.use(cookieParser());

//below tells in which folder should app look out for static files
app.use(express.static('./assets'));

//use express layout library by server--use this below library only before routes since this library is going to render views 
app.use(expressLayouts);
//use express router -this  use to routes to views which are going to be rendered

//below line is used to extract style and script from sub-pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// //use express router this  use to routes to views which are going to be rendered
// app.use('/', require('./routers'));
   
//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db


//add a middleware which takes in the session cookie and  encrypt it
app.use(session({
//properties need to be set
name:'codial',
//TODO change the secret before deployment in production mode
//blahsomething is the key which is used to encrypt the cookie
secret:'blahsomething',
//when the session is uninitialixed that is user has not logged in or the identity is not establised than  we don't want to save any extra data in the session cookie
saveUninitialized:false,
//when the identity is established or some sort of data is present in the session cookie that is user data if that is being stored,so we don't want to rewrite it again and again
resave:false,
//need to give some age to cookie after that period of time cookie get expire
cookie:{
    maxAge:(1000*60*100)
},
Store: new MongoStore(
{
    mongooseConnection:db,
    autoRemove:'disabled'
},function(err){
    console.log(err || 'connect mongodb setup ok')
}
)
}
));

//passport helps in maintaining the session
app.use(passport.initialize());
app.use(passport.session());


//set the current user usage
app.use(passport.setAuthenticatedUser);
//when app is initialized than passport  will also be initialized as a result above function is called and it will check whether a session cookie is present or not or  above function will be automatically called as a middleware whenever any request is coming in and it will set user in the locals

app.use('/',require('./routers'));


app.listen(port,function(err){
    if(err){
        console.log('error',err);
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`server is up and running on port: ${port}`)
}
);
//when db is not getting connected --go to control panel-->administrative tool-->double click on services-->right click on mongoDB server and start the service

//so whenever server is restarted our session data gets deleted and our session data is temporarly stored not permanent