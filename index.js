const express = require('express');
const cookieParser = require('cookie-parser');
const env = require('./config/environment')
const app = express();
// const fetch=(...args)=>import('node-fetch').then(({default: fetch})=>fetch(...args));
require('./config/view-helpers')(app);
const port = 8000;
//inorder to keep the error log in a particular file  during production environment we use morgan library to manage the logs
const logger=require('morgan');

const db = require('./config/mongoose');
//below library is used to automatically encrypt the session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
//below library is used to store the session cookie in db  so that even after the server restart ,session do not get deleted
//unlike other library this library require argument which is going to stored
const MongoStore = require('connect-mongo')(session);
//below middlware package/library is to just convert sass-css code into css format before sending it to the browser
const sassMiddleware = require('node-sass-middleware');


//when we use layouts library
const expressLayouts = require('express-ejs-layouts');
//when we  need to display flash messages
const flash = require('connect-flash');
const customMWare = require('./config/middleware');


//setup the chat server to be used with server.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on  port 5000 ');
const path = require('path');

console.log('environ',env.name)
if (env.name == 'development') {
    

    //we need to put the below middleware just before the server starts bcoz we need sass files to pre compiled before server starts so whenever our template/browser ask for it these precompiled files are given back
    app.use(sassMiddleware({
        //below  is path from where we pick up the scss files to convert it into css
        src: path.join(__dirname, env.assest_path, 'scss'),
        //below is the path where do i need to place the converted css files
        dest: path.join(__dirname, env.assest_path, 'css'),
        //below property is to see the error which might occur while compiling the scss file into css in the terminal note:put below option false if running in the production mode
        debug: true,
        //below property helps to identify whether we want output to be in a single line or in multiple line so now we want it in expanded mode
        outputStyle: 'expanded',
        //below property helps server  to look out for css file
        prefix: '/css'


    }));



}


//reading through the post request
app.use(express.urlencoded({extended:false}));

//setting up the cookieParser
app.use(cookieParser());

//below tells in which folder should app look out for static files
app.use(express.static(env.assest_path));

//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode,env.morgan.options));

//use express layout library by server--use this below library only before routes since this library is going to render views 
app.use(expressLayouts);
//use express router -this  use to routes to views which are going to be rendered

//below line is used to extract style and script from sub-pages into layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// //use express router this  use to routes to views which are going to be rendered
// app.use('/', require('./routers'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db


//add a middleware which takes in the session cookie and  encrypt it
app.use(session({
    //properties need to be set
    //name of my cookie
    name: 'codial',
    //TODO change the secret before deployment in production mode
    //blahsomething is the key which is used to encrypt the cookie and  decrypt 
    secret: env.session_cookie_key,
    //when the session is uninitialixed that is user has not logged in or the identity is not establised than  we don't want to save any extra data in the session cookie
    saveUninitialized: false,
    //when the identity is established or some sort of data is present in the session cookie that is user data if that is being stored,so we don't want to rewrite it again and again
    resave: false,
    //need to give some age to cookie for how it should be valid after that period of time cookie get expire
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    Store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        }, function (err) {
            console.log(err || 'connect mongodb setup ok')
        }
    )
}
));

//initializing the passport
app.use(passport.initialize());
//passport helps in maintaining the session
app.use(passport.session());


//set the current user usage
app.use(passport.setAuthenticatedUser);
//when app is initialized than passport  will also be initialized as a result above function is called and it will check whether a session cookie is present or not or  above function will be automatically called as a middleware whenever any request is coming in and it will set user in the locals

//set the flash for use-always mention this below line after the session bcoz flash uses session cookies
//the flash message will be setup in the cookies it stores the session information
app.use(flash());
app.use(customMWare.setFlash);



app.use('/', require('./routers'));


app.listen(port, function (err) {
    if (err) {
        console.log('error', err);
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`server is up and running on port: ${port}`)
}
);
//when db is not getting connected --go to control panel-->administrative tool-->double click on services-->right click on mongoDB server and start the service

//so whenever server is restarted our session data gets deleted and our session data is temporarly stored not permanent