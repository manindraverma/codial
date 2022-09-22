const express=require('express');
const app=express();
const port=8000;

//use express router
app.use('/',require('./routers'));

app.listen(port,function(err){
    if(err){
        console.log('error',err);
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`server is up and running on port: ${port}`)
}
);