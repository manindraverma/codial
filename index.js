const express=require('express');
const app=express();
const port=8000;
//when we use layouts library
const expressLayouts= require('express-ejs-layouts')

//use express layout library by server--use this below library only before routes since this library is going to render views 
app.use(expressLayouts);
//use express router -this  use to routes to views which are going to be rendered

//below line is used to extract style and script from sub-pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routers'));

//below tells in which folder should app look out for static files
app.use(express.static('./assets'));


//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log('error',err);
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`server is up and running on port: ${port}`)
}
);