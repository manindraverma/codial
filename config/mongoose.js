const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/coedial_development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"error connecting to mongoDB"));

db.once('open',function(){
    console.log("connected to database:: MongoDB");
});

module.exports=db;